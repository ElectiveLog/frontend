<template>
  <div class="container">
    <!-- Introduction -->

    <!-- Titres -->
    <h1>Les titres</h1>
    <a
      >Les différents titres du site seront sous les formes suivantes. Les
      titres sont totalement stendardisés et devront être identiques sur tout le
      site. Cependant les couleurs de ces derniers peuvent être modifiées au
      besoin, notamment en fonction du fond.</a
    >
    <br />
    <div>
      <ul>
        <h1>Premier titre</h1>
        <h2>Deuxième titre</h2>
        <h3>Troisième titre</h3>
        <h4>Quatrième titre</h4>
      </ul>
    </div>
    <br />

    <!-- Police -->
    <h1>La police</h1>
    <p>
      La police utilisée pour les titres, les paragraphes, les boutons et tous
      les autres éléments est Anek Latin 500. Le choix d'une seule et même
      police permet de coordonner mes éléments et de garder une logique au sein
      du site.
    </p>
    <br />

    <!-- Couleurs -->
    <h1>Les couleurs</h1>
    <a
      >Les couleurs qui seront utilisées sur l'intégralité du site sont les
      suivantes. Elles constitueront la palette de tout le site.</a
    >
    <div class="row">
      <div class="container">
        <div class="row d-flex justify-content-center">
          <div class="col-sm text-center">
            <a>Vert classique, sert aux validations</a>
            <p class="circle green_background"></p>
          </div>
          <div class="col-sm text-center">
            <a>Vert légèrement plus clair</a>
            <p class="circle cleargreen_background"></p>
          </div>
          <div class="col-sm text-center">
            <a>Bleu de base, tirée du logo</a>
            <p class="circle blue_background"></p>
          </div>
          <div class="col-sm text-center">
            <a>Bleu légèrement plus clair</a>
            <p class="circle clearblue_background"></p>
          </div>
          <div class="col-sm text-center">
            <a>Gris anthracite, couleur sombre</a>
            <p class="circle grey_background"></p>
          </div>
          <div class="col-sm text-center">
            <a>Rouge classique, sert aux erreurs</a>
            <p class="circle red_background"></p>
          </div>
        </div>
      </div>
    </div>

    <!-- Logos -->
    <img class="logo_round" src="../../logos/logo_round.png" />
    <img class="logo_mini" src="../../logos/logo_mini.png" />
    <img class="logo_rec" src="../../logos/logo_rec.png" />

    <!-- Boutons -->
    <div class="row">
      <div class="container">
        <div class="row d-flex justify-content-center">
          <div class="col-sm text-center">
            <button class="green_button styled_button" type="button">
              Green
            </button>
          </div>
          <div class="col-sm text-center">
            <button class="blue_button styled_button" type="button">
              Blue
            </button>
          </div>
          <div class="col-sm text-center">
            <button class="grey_button styled_button" type="button">
              Grey
            </button>
          </div>
          <div class="col-sm text-center">
            <button class="red_button styled_button" type="button">Red</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StyleGuide",
};
</script>
