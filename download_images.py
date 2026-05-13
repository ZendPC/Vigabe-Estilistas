import asyncio
from playwright.async_api import async_playwright
import urllib.request, os, re

BASE = 'c:/Users/ljest/Desktop/Proyectillos/Peluquerías'
IMG_DIR = f'{BASE}/Vigabe/public/images'
os.makedirs(IMG_DIR, exist_ok=True)

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context(
            locale='es-ES',
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        )
        page = await context.new_page()

        print('Abriendo Instagram...')
        await page.goto('https://www.instagram.com/vigabeestilistas/', wait_until='domcontentloaded', timeout=30000)
        await page.wait_for_timeout(2000)

        # Aceptar cookies
        try:
            await page.click('button:has-text("Permitir")', timeout=5000)
            await page.wait_for_timeout(2000)
        except:
            pass

        await page.wait_for_timeout(3000)

        # Foto de perfil
        profile_img = await page.query_selector('img[alt*="foto de perfil"], img[alt*="profile picture"], header img')
        if profile_img:
            src = await profile_img.get_attribute('src')
            print('LOGO URL:', src[:100] if src else 'None')
            if src:
                try:
                    req = urllib.request.Request(src, headers={'User-Agent': 'Mozilla/5.0'})
                    data = urllib.request.urlopen(req).read()
                    open(f'{IMG_DIR}/logo.jpg', 'wb').write(data)
                    print('Logo descargado')
                except Exception as e:
                    print('Error logo:', e)

        # Todas las imágenes de posts
        await page.wait_for_timeout(2000)
        # Scroll para cargar más
        for _ in range(3):
            await page.keyboard.press('End')
            await page.wait_for_timeout(1500)

        # Buscar imágenes de posts
        imgs = await page.query_selector_all('article img[src], div[role="button"] img[src]')
        print(f'Imágenes encontradas: {len(imgs)}')

        downloaded = 0
        seen = set()
        for i, img in enumerate(imgs):
            src = await img.get_attribute('src')
            if not src or src in seen:
                continue
            if 'cdninstagram' in src or 'fbcdn' in src:
                seen.add(src)
                try:
                    req = urllib.request.Request(src, headers={
                        'User-Agent': 'Mozilla/5.0',
                        'Referer': 'https://www.instagram.com/'
                    })
                    data = urllib.request.urlopen(req, timeout=10).read()
                    fname = f'{IMG_DIR}/post_{downloaded+1:02d}.jpg'
                    open(fname, 'wb').write(data)
                    print(f'Descargada: post_{downloaded+1:02d}.jpg ({len(data)} bytes)')
                    downloaded += 1
                    if downloaded >= 12:
                        break
                except Exception as e:
                    print(f'Error img {i}:', e)

        print(f'\nTotal descargadas: {downloaded}')

        # Screenshot del perfil
        await page.screenshot(path=f'{BASE}/insta_profile.png', full_page=False)

        await browser.close()

asyncio.run(main())
