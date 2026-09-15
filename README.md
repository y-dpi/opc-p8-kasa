## Location de logements Kasa

Ce projet est le frontend de l'application Kasa, construit avec Next.js, React, Tailwind CSS et TypeScript. Il permet de parcourir les logements proposés à la location, de consulter leur fiche et leur galerie de photos, de gérer ses favoris, de déposer sa propre annonce et d'accéder à la messagerie.

L'API backend n'est **pas** incluse dans ce dépôt : le frontend consomme une API REST externe que vous devez fournir. La messagerie fait exception : faute d'endpoint dédié côté API, ses conversations restent statiques pour le moment.

## Pour utiliser ce projet :

- Commencer par cloner le projet.
- Assurez-vous d'avoir [Node.js](https://nodejs.org/) (version 20.9 ou supérieure, requise par Next.js 16) et [pnpm](https://pnpm.io/) installés.

### Brancher l'API (backend)

L'API se configure en premier, car le frontend consomme ses données.

- Renommez le fichier `example.env.local` en `.env.local`.
- Renseignez la variable `API_URL` avec l'URL de base de votre API (par exemple `http://localhost:3000`, sans slash final).
- Renseignez la variable `SITE_URL` avec l'adresse à laquelle le site lui-même est servi (par exemple `http://localhost:3001`, sans slash final) : elle sert aux liens canoniques, au sitemap et au fichier robots.
- Assurez-vous que votre API est démarrée et accessible à cette adresse.

> `API_URL` et `SITE_URL` sont lues uniquement côté serveur : elles ne sont jamais exposées au navigateur. L'authentification se fait par JWT, stocké dans un cookie de session `httpOnly` géré par le serveur Next.js.

### Lancer le frontend

- Ouvrez un terminal à la racine du projet.
- Exécutez `pnpm install` pour installer les dépendances.
- Exécutez `pnpm run dev` pour démarrer le serveur de développement.
- Votre site devrait alors être accessible à l'adresse `http://localhost:3001` dans n'importe quel navigateur.

Pour générer une version de production, utilisez `pnpm run build` (puis `pnpm run start` pour la servir). Le linter s'exécute avec `pnpm run lint`, et les tests avec `pnpm test` (`pnpm run test:coverage` pour la couverture, `pnpm run test:ui` pour l'interface).

> Passez la variable `API_MOCK` à `true` dans `.env.local` pour servir toutes les pages depuis les jeux de données du dossier `/mocks`, sans API démarrée. Les tests s'exécutent toujours dans ce mode, et ne joignent donc jamais le réseau.

## Dépendances externes :
  - [Node.js](https://nodejs.org/) (v20.9+)
  - [pnpm](https://pnpm.io/) (vous devriez également pouvoir utiliser `npm` ou `yarn`)
  - Une API REST compatible, à brancher via la variable `API_URL`
  - Côté frontend : [Next.js](https://nextjs.org/), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [TypeScript](https://www.typescriptlang.org/)
  - Côté tests : [Vitest](https://vitest.dev/) et [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## Problèmes courants :

Si les commandes `pnpm` échouent, vérifiez que Node.js et pnpm sont bien installés en exécutant `node --version` et `pnpm --version`.

Si le frontend n'affiche aucune donnée, ou si la connexion échoue systématiquement, vérifiez que le fichier `.env.local` existe bien (et non `example.env.local`), que `API_URL` pointe vers votre API et que celle-ci est bien démarrée et joignable. À défaut d'API disponible, passez `API_MOCK` à `true` dans `.env.local` pour travailler sur les jeux de données fournis.

Si le port `3001` est déjà utilisé, lancez le serveur sur un autre port avec `pnpm exec next dev -p 3002`. Notez que `pnpm run dev -- -p 3002` ne fonctionne pas : le port est déjà fixé dans le script `dev` du `package.json`.

Ce projet a été développé avec Node.js. Bien que d'autres versions puissent fonctionner, le bon fonctionnement n'est pas garanti avec des versions plus anciennes.
