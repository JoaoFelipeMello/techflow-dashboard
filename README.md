# TechFlow Dashboard

Checkpoint 5 – FrontEnd Design

## Integrantes

| Nome | RM |
|---|---|
| João Mello | RM573001 |

## Tecnologias utilizadas

- HTML
- Tailwind CSS
- JavaScript puro

## Principais recursos implementados

- Dashboard com Navbar, Sidebar, campo de pesquisa, informações do usuário, 4 cards de indicadores e 6 cards de projetos.
- Cards de projetos em CSS Grid com tamanhos diferentes (`grid-cols-*`, `col-span-*`, `row-span-*`).
- Modal "Novo projeto" com validação visual em JavaScript (estados de erro e sucesso).
- Layout Mobile-First com os breakpoints `sm:`, `md:`, `lg:`, `xl:` e `2xl:`.
- Sidebar fixa no desktop e menu lateral no celular.
- Dropdown do usuário.
- Estados `hover:`, `focus:`, `active:`, `disabled:`, `group-hover:` e `peer-checked:`.
- Transições com `transition`, `transition-all`, `duration-*` e `ease-*`.
- Seletor de tema Light | Dark | System com a variante `dark:`, respeitando a preferência do sistema e salvando a escolha no `localStorage`.

## Link do GitHub

https://github.com/SEU-USUARIO/techflow-dashboard

## Dificuldades encontradas

- Configurar o dark mode controlado por JavaScript no Tailwind.
- Montar o Grid com cards de tamanhos diferentes sem deixar espaços vazios.
- Fazer a animação de abrir e fechar o modal.
