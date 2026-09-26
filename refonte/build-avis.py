#!/usr/bin/env python3
"""Génère les cartes d'avis Google dans refonte/index.html à partir de data/avis-google.txt.

Usage : python3 refonte/build-avis.py
Les cartes sont écrites entre les marqueurs <!-- AVIS:START --> et <!-- AVIS:END -->.
Les textes sont repris tels quels ; seul le nom est abrégé (prénom + initiale).
"""
import html
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent
DATA = ROOT / 'data' / 'avis-google.txt'
PAGE = ROOT / 'index.html'
GOOGLE_URL = 'https://www.google.com/search?q=hynera+environnement#lrd=0x480f1e4ef513175d:0x7bbbef413f68f387,1'
BUSINESS = {'GARAGE AD DUBOIS': 'Garage AD Dubois'}
# Pseudonymes : affichés tels quels
PSEUDOS = {'K-ra 77', 'Vava voum', 'Nath Chat Poron'}


def cap(word):
    return word[:1].upper() + word[1:] if word[:1].islower() else word


def short_name(raw):
    """« anne marie Larible » -> « Anne Marie L. » ; pseudonyme d'un mot laissé tel quel."""
    if raw in BUSINESS:
        return BUSINESS[raw]
    if raw in PSEUDOS:
        return raw
    parts = raw.split()
    if len(parts) == 1:
        return raw
    last = parts[-1]
    first = parts[:-1]
    # « Julien Le marec » : particule comprise dans le nom de famille
    if len(first) > 1 and first[-1] in ('Le', 'La', 'De', 'Du'):
        last = first.pop()
    return ' '.join(cap(p) for p in first) + ' ' + last[0].upper() + '.'


def months(age):
    n, unit = re.match(r'(\d+)\s+(mois|an|ans)$', age).groups()
    return int(n) * (1 if unit == 'mois' else 12)


def card(stars, name, age, text):
    truncated = text.endswith('…')
    star_svg = '<svg><use href="#i-star"/></svg>' * stars
    more = (f'\n                <a class="review-more" href="{GOOGLE_URL}" target="_blank" rel="noopener">'
            f'Voir l\'avis complet sur Google<span class="sr-only"> (nouvel onglet)</span></a>') if truncated else ''
    esc = html.escape(text, quote=False)
    initial = html.escape(name[0])
    return f'''            <li class="review">
              <figure>
                <p class="review-rating"><span class="stars" aria-hidden="true">{star_svg}</span><span class="sr-only">Note : {stars} sur 5</span></p>
                <blockquote><p>{esc}</p></blockquote>{more}
                <figcaption><span class="review-avatar" aria-hidden="true">{initial}</span><span><strong>{html.escape(name)}</strong><span class="review-meta">Avis Google<span class="review-age" data-months="{months(age)}"></span></span></span></figcaption>
              </figure>
            </li>'''


def main():
    rows = []
    for line in DATA.read_text(encoding='utf-8').splitlines():
        if not line.strip() or line.startswith('#'):
            continue
        stars, name, age, text = [p.strip() for p in line.split('|', 3)]
        rows.append((int(stars), short_name(name), age, text))
    cards = '\n'.join(card(*r) for r in rows)
    page = PAGE.read_text(encoding='utf-8')
    new, n = re.subn(r'<!-- AVIS:START -->.*?<!-- AVIS:END -->',
                     lambda m: '<!-- AVIS:START -->\n' + cards + '\n            <!-- AVIS:END -->', page, flags=re.S)
    if n != 1:
        raise SystemExit('Marqueurs AVIS introuvables dans index.html')
    new = re.sub(r'(<span class="reviews-count">)\d+', lambda m: m.group(1) + str(len(rows)), new)
    PAGE.write_text(new, encoding='utf-8')
    print(f'{len(rows)} avis écrits dans {PAGE.name}')


if __name__ == '__main__':
    main()
