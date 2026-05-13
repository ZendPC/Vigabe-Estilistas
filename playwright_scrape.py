import asyncio
from playwright.async_api import async_playwright
import re, json, os

BASE = 'c:/Users/ljest/Desktop/Proyectillos/Peluquerías'

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            locale='es-ES',
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        )
        page = await context.new_page()

        # --- Google Maps ---
        print('=== GOOGLE MAPS ===')
        await page.goto('https://www.google.com/maps/search/Vigabe+Estilistas+Almeria', wait_until='networkidle', timeout=30000)
        await page.wait_for_timeout(3000)
        content = await page.content()
        open(f'{BASE}/maps_rendered.html', 'w', encoding='utf-8').write(content)

        # Extraer texto visible
        text = await page.inner_text('body')
        lines = [l.strip() for l in text.split('\n') if l.strip() and len(l.strip()) > 3]
        print('\n'.join(lines[:80]))

        # --- Instagram ---
        print('\n=== INSTAGRAM ===')
        await page.goto('https://www.instagram.com/vigabe_estilistas/', wait_until='networkidle', timeout=30000)
        await page.wait_for_timeout(4000)
        insta_content = await page.content()
        open(f'{BASE}/insta_rendered.html', 'w', encoding='utf-8').write(insta_content)

        insta_text = await page.inner_text('body')
        insta_lines = [l.strip() for l in insta_text.split('\n') if l.strip() and len(l.strip()) > 3]
        print('\n'.join(insta_lines[:60]))

        # Buscar foto de perfil
        profile_imgs = await page.query_selector_all('img[alt*="vigabe"], img[alt*="Vigabe"]')
        for img in profile_imgs[:3]:
            src = await img.get_attribute('src')
            print('PROFILE IMG:', src)

        # Buscar imágenes de posts
        post_imgs = await page.query_selector_all('article img, ._aagv img')
        print(f'\nPost images found: {len(post_imgs)}')
        img_urls = []
        for img in post_imgs[:12]:
            src = await img.get_attribute('src')
            if src:
                img_urls.append(src)
                print('POST IMG:', src[:100])

        await browser.close()

asyncio.run(main())
