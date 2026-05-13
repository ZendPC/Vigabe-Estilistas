WA = 'https://wa.link/wl9u2s'

cta_files = [
    'src/components/Hero.jsx',
    'src/components/About.jsx',
    'src/components/Services.jsx',
    'src/components/Contact.jsx',
    'src/components/Navbar.jsx',
]

replacements = [
    ('href="tel:663738845" className="btn-primary"',
     f'href="{WA}" className="btn-primary" target="_blank" rel="noopener noreferrer"'),
    ('href="tel:663738845" className="navbar-cta"',
     f'href="{WA}" className="navbar-cta" target="_blank" rel="noopener noreferrer"'),
    # Contact CTA button
    ('href="tel:663738845" className="btn-primary" aria-label="Llamar para reservar cita ahora"',
     f'href="{WA}" className="btn-primary" target="_blank" rel="noopener noreferrer" aria-label="Reservar cita por WhatsApp"'),
    # About button
    ('href="tel:663738845" className="btn-primary" style={{ display: \'inline-flex\', alignItems: \'center\', gap: \'0.5rem\', marginTop: \'2rem\' }}',
     f'href="{WA}" className="btn-primary" style={{{{ display: \'inline-flex\', alignItems: \'center\', gap: \'0.5rem\', marginTop: \'2rem\' }}}} target="_blank" rel="noopener noreferrer"'),
]

for f in cta_files:
    content = open(f, encoding='utf-8').read()
    new_content = content
    for old, new in replacements:
        new_content = new_content.replace(old, new)
    if new_content != content:
        open(f, 'w', encoding='utf-8').write(new_content)
        print(f'Updated: {f}')
    else:
        print(f'No change: {f}')
