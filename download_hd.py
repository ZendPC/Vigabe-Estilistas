import asyncio
from playwright.async_api import async_playwright
import urllib.request, os

BASE = 'c:/Users/ljest/Desktop/Proyectillos/Peluquerías'
IMG_DIR = f'{BASE}/Vigabe/public/images'
os.makedirs(IMG_DIR, exist_ok=True)

async def download_url(url, path):
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0',
            'Referer': 'https://www.instagram.com/'
        })
        data = urllib.request.urlopen(req, timeout=15).read()
        open(path, 'wb').write(data)
        return len(data)
    except Exception as e:
        print(f'  Error: {e}')
        return 0

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context(
            locale='es-ES',
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        )
        page = await context.new_page()

        # Ir al perfil
        await page.goto('https://www.instagram.com/vigabeestilistas/', wait_until='domcontentloaded', timeout=30000)
        await page.wait_for_timeout(2000)
        try:
            await page.click('button:has-text("Permitir")', timeout=5000)
            await page.wait_for_timeout(2000)
        except:
            pass
        await page.wait_for_timeout(3000)

        # Descargar logo en alta resolución
        profile_img = await page.query_selector('header img')
        if profile_img:
            src = await profile_img.get_attribute('src')
            # Intentar obtener versión HD
            src_hd = re.sub(r's\d+x\d+/', 's320x320/', src) if src else src
            size = await download_url(src, f'{IMG_DIR}/logo.jpg')
            print(f'Logo: {size} bytes')

        # Recopilar links de posts
        post_links = await page.query_selector_all('a[href*="/p/"]')
        hrefs = []
        seen = set()
        for link in post_links:
            href = await link.get_attribute('href')
            if href and href not in seen:
                seen.add(href)
                hrefs.append('https://www.instagram.com' + href if href.startswith('/') else href)

        print(f'Posts encontrados: {len(hrefs)}')

        downloaded = 0
        for i, href in enumerate(hrefs[:15]):
            print(f'Abriendo post {i+1}: {href}')
            await page.goto(href, wait_until='domcontentloaded', timeout=20000)
            await page.wait_for_timeout(2500)

            # Buscar imagen principal del post
            imgs = await page.query_selector_all('article img[src]')
            best_src = None
            best_size = 0
            for img in imgs:
                src = await img.get_attribute('src')
                if src and ('cdninstagram' in src or 'fbcdn' in src):
                    # Preferir imágenes más grandes (no thumbnails)
                    srcset = await img.get_attribute('srcset')
                    if srcset:
                        # Tomar la URL más grande del srcset
                        parts = [p.strip().split(' ') for p in srcset.split(',')]
                        for part in reversed(parts):
                            if len(part) >= 1 and part[0].startswith('http'):
                                best_src = part[0]
                                break
                    if not best_src:
                        best_src = src
                    break

            if best_src:
                size = await download_url(best_src, f'{IMG_DIR}/post_{downloaded+1:02d}.jpg')
                if size > 5000:
                    print(f'  post_{downloaded+1:02d}.jpg: {size} bytes ✓')
                    downloaded += 1
                else:
                    print(f'  Imagen muy pequeña ({size}b), saltando')
            else:
                print(f'  No imagen encontrada')

            if downloaded >= 12:
                break

        print(f'\nTotal HD descargadas: {downloaded}')
        await browser.close()

import re
asyncio.run(main())
