import asyncio
from playwright.async_api import async_playwright
import re, os

BASE = 'c:/Users/ljest/Desktop/Proyectillos/Peluquerías'

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)  # visible para debug
        context = await browser.new_context(
            locale='es-ES',
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        )
        page = await context.new_page()

        # --- Google Maps: aceptar cookies primero ---
        print('=== GOOGLE MAPS ===')
        await page.goto('https://www.google.com/maps/search/Vigabe+Estilistas+Almeria', wait_until='domcontentloaded', timeout=30000)
        await page.wait_for_timeout(2000)

        # Aceptar cookies Google
        try:
            await page.click('button:has-text("Aceptar todo")', timeout=5000)
            print('Cookies Google aceptadas')
            await page.wait_for_timeout(3000)
        except:
            print('No cookie banner Google')

        await page.wait_for_timeout(4000)
        content = await page.content()
        open(f'{BASE}/maps_rendered2.html', 'w', encoding='utf-8').write(content)
        text = await page.inner_text('body')
        lines = [l.strip() for l in text.split('\n') if l.strip() and len(l.strip()) > 3]
        print('\n'.join(lines[:100]))

        # --- Instagram: buscar perfil correcto ---
        print('\n=== INSTAGRAM - buscar vigabe ===')
        await page.goto('https://www.instagram.com/vigabeestilistas/', wait_until='domcontentloaded', timeout=30000)
        await page.wait_for_timeout(3000)

        # Aceptar cookies Instagram
        try:
            await page.click('button:has-text("Permitir")', timeout=5000)
            print('Cookies Instagram aceptadas')
            await page.wait_for_timeout(2000)
        except:
            pass
        try:
            await page.click('button:has-text("Allow")', timeout=3000)
            await page.wait_for_timeout(2000)
        except:
            pass

        insta_text = await page.inner_text('body')
        insta_lines = [l.strip() for l in insta_text.split('\n') if l.strip() and len(l.strip()) > 3]
        print('\n'.join(insta_lines[:40]))

        # Screenshot para ver qué hay
        await page.screenshot(path=f'{BASE}/insta_screenshot.png', full_page=False)
        print('Screenshot guardado')

        await browser.close()

asyncio.run(main())
