import asyncio
from playwright.async_api import async_playwright
import urllib.request, os, re

BASE = 'c:/Users/ljest/Desktop/Proyectillos/Peluquerías'
IMG_DIR = f'{BASE}/Vigabe/public/images'
os.makedirs(IMG_DIR, exist_ok=True)

captured_images = []

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context(
            locale='es-ES',
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        )
        page = await context.new_page()

        # Interceptar todas las requests de imagen
        async def handle_response(response):
            url = response.url
            if ('cdninstagram' in url or 'fbcdn' in url) and response.status == 200:
                ct = response.headers.get('content-type', '')
                if 'image' in ct or url.endswith('.jpg') or url.endswith('.webp'):
                    if url not in captured_images:
                        captured_images.append(url)

        page.on('response', handle_response)

        # Ir al perfil
        print('Cargando perfil...')
        await page.goto('https://www.instagram.com/vigabeestilistas/', wait_until='domcontentloaded', timeout=30000)
        await page.wait_for_timeout(2000)
        try:
            await page.click('button:has-text("Permitir")', timeout=5000)
            await page.wait_for_timeout(2000)
        except:
            pass
        await page.wait_for_timeout(4000)

        # Scroll para cargar más imágenes
        for _ in range(5):
            await page.keyboard.press('End')
            await page.wait_for_timeout(2000)

        print(f'URLs capturadas: {len(captured_images)}')
        for url in captured_images:
            print(' ', url[:120])

        # Filtrar imágenes grandes (no thumbnails de 150x150)
        big_imgs = [u for u in captured_images if not re.search(r's150x150|s\d{2}x\d{2}[^0]', u)]
        print(f'\nImágenes grandes: {len(big_imgs)}')

        # Descargar
        downloaded = 0
        for url in big_imgs:
            try:
                req = urllib.request.Request(url, headers={
                    'User-Agent': 'Mozilla/5.0',
                    'Referer': 'https://www.instagram.com/'
                })
                data = urllib.request.urlopen(req, timeout=15).read()
                if len(data) > 10000:
                    fname = f'{IMG_DIR}/post_{downloaded+1:02d}.jpg'
                    open(fname, 'wb').write(data)
                    print(f'post_{downloaded+1:02d}.jpg: {len(data)} bytes')
                    downloaded += 1
                    if downloaded >= 12:
                        break
            except Exception as e:
                print(f'Error: {e}')

        print(f'\nTotal: {downloaded}')
        await browser.close()

asyncio.run(main())
