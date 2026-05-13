import re

data = open('c:/Users/ljest/Desktop/Proyectillos/Peluquerías/maps.html', encoding='utf-8').read()

# Buscar dirección, teléfono, horario, nombre
patterns = [
    ('Vigabe', r'(Vigabe[^<"]{0,100})'),
    ('telefono', r'(\+34[\s\d\-]{8,15}|\d{3}[\s\-]?\d{3}[\s\-]?\d{3})'),
    ('horario', r'(lunes|martes|miércoles|jueves|viernes|sábado|domingo)[^<]{0,50}'),
    ('calle', r'(Calle|Avenida|Plaza|C\/)[^<"]{0,80}'),
]

for name, p in patterns:
    matches = re.findall(p, data, re.IGNORECASE)
    print(f'\n=== {name} ===')
    for m in matches[:5]:
        print(' ', m.strip())

# Buscar JSON embebido con datos del negocio
json_chunks = re.findall(r'\[\["\w+",\[\[null,null,null,\["([^"]+)"', data)
print('\n=== JSON chunks ===')
for c in json_chunks[:10]:
    print(' ', c[:120])

# Buscar coordenadas
coords = re.findall(r'@(-?\d+\.\d+),(-?\d+\.\d+)', data)
print('\n=== Coordenadas ===', coords[:3])
