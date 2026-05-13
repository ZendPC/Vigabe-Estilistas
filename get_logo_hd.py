import asyncio
from playwright.async_api import async_playwright
import urllib.request, re

BASE = 'c:/Users/ljest/Desktop/Proyectillos/Peluquerías'
IMG_DIR = f'{BASE}/Vigabe/public/images'

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context(locale='es-ES', user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36')
        page = await context.new_page()

        captured = []
        async def on_response(resp):
            url = resp.url
            if ('fbcdn' in url or 'cdninstagram' in url) and resp.status == 200:
                ct = resp.headers.get('content-type', '')
                if 'image' in ct:
                    captured.append(url)

        page.on('response', on_response)

        await page.goto('https://www.instagram.com/vigabeestilistas/', wait_until='domcontentloaded', timeout=30000)
        await page.wait_for_timeout(2000)
        try:
            await page.click('button:has-text("Permitir")', timeout=4000)
            await page.wait_for_timeout(2000)
        except:
            pass
        await page.wait_for_timeout(3000)

        # Buscar la foto de perfil más grande
        profile_imgs = [u for u in captured if 't51.82787-19' in u or 'profile' in u.lower()]
        print('Profile img URLs:')
        for u in profile_imgs:
            print(' ', u[:150])

        # Intentar obtener versión 320x320
        header_img = await page.query_selector('header img')
        if header_img:
            src = await header_img.get_attribute('src')
            print('\nHeader img src:', src[:150] if src else None)
            # Modificar URL para obtener mayor resolución
            if src:
                # Reemplazar tamaño pequeño por 320x320
                src_hd = re.sub(r'dst-jpg_s\d+x\d+', 'dst-jpg_s320x320', src)
                src_hd = re.sub(r'_s\d+x\d+_', '_s320x320_', src_hd)
                print('HD URL:', src_hd[:150])
                try:
                    req = urllib.request.Request(src_hd, headers={'User-Agent': 'Mozilla/5.0', 'Referer': 'https://www.instagram.com/'})
                    data = urllib.request.urlopen(req, timeout=10).read()
                    open(f'{IMG_DIR}/logo_hd.jpg', 'wb').write(data)
                    print(f'Logo HD: {len(data)} bytes')
                except Exception as e:
                    print('Error HD:', e)
                    # Guardar original
                    req = urllib.request.Request(src, headers={'User-Agent': 'Mozilla/5.0', 'Referer': 'https://www.instagram.com/'})
                    data = urllib.request.urlopen(req, timeout=10).read()
                    open(f'{IMG_DIR}/logo_hd.jpg', 'wb').write(data)
                    print(f'Logo original: {len(data)} bytes')

        # Screenshot del logo
        if header_img:
            await header_img.screenshot(path=f'{BASE}/logo_screenshot.png')
            print('Logo screenshot guardado')

        await browser.close()

asyncio.run(main())
