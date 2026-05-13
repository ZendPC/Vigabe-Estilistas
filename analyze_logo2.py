from PIL import Image
import collections

img = Image.open('c:/Users/ljest/Desktop/Proyectillos/Peluquerías/Vigabe/public/images/logo.jpg')
img = img.convert('RGB')
w, h = img.size
print(f'Tamaño: {w}x{h}')

# Analizar todos los píxeles sin reducir
pixels = list(img.getdata())

# Filtrar colores no grises (donde R, G, B difieren significativamente)
colored = []
for r, g, b in pixels:
    # Si hay diferencia entre canales = color real
    diff = max(abs(r-g), abs(r-b), abs(g-b))
    if diff > 15:  # tiene color
        colored.append((r, g, b))

print(f'Píxeles con color: {len(colored)} de {len(pixels)}')

# Agrupar por color dominante
counter = collections.Counter(colored)
top = counter.most_common(30)
print('\nColores con matiz:')
for color, count in top:
    r, g, b = color
    hex_color = f'#{r:02x}{g:02x}{b:02x}'
    # Determinar color dominante
    if r > g and r > b:
        dom = 'ROJO/NARANJA'
    elif g > r and g > b:
        dom = 'VERDE'
    elif b > r and b > g:
        dom = 'AZUL'
    elif r > b and g > b:
        dom = 'AMARILLO/DORADO'
    else:
        dom = 'OTRO'
    print(f'  {hex_color}  {dom}  x{count}')

# Guardar imagen con zoom de la zona central (donde suele estar el logo)
center = img.crop((80, 80, 240, 240))
center_big = center.resize((400, 400), Image.NEAREST)
center_big.save('c:/Users/ljest/Desktop/Proyectillos/Peluquerías/logo_center.png')
print('\nlogo_center.png guardado')
