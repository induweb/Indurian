# Indurian
Arcade game built with React, Redux, HTML, CSS. Clone of Brick Breaker (Arkanoid).

Demo - http://indurian.induweb.pl

Gameplay video

[![Indurian](http://img.youtube.com/vi/5qw4dKGEFnw/0.jpg)](http://www.youtube.com/watch?v=5qw4dKGEFnw)


# Features:

* menu główne stworzone za pomocą React Router,
* lista 10 najlepszych wyników przechowywana jako obiekt JSON w SessionStorage,
* lista poziomów – React Router, oraz lista poziomów dostępnych dla gracza jako obiekt JSON w SessionStorage (ukończenie poziomu skutkowało odblokowaniem następnego),
dźwięki w grze,
* zliczanie punktów,
* zliczanie pozostałych żyć,
* czarodziej – poruszanie w górę i w dół, czarowanie aż do wyczerpania many, animacje spoczynku, biegu, czarowania, śmierci, obrażenia otrzymywane od przeciwników zmniejszające poziom hp,
* przeciwnicy – poruszanie w górę i w dół, czarowanie, animacje spoczynku, biegu, czarowania, obrażenia od piłki i czaru zmniejszające poziom hp, dowolna liczba przeciwników na planszy,
* zbijanie bloków za pomocą piłeczki lub czarów, różna wymagana liczba trafień bloku do zbicia,
* bonusy ze zbitych bloków w postaci monet zwiększających liczbę punktów,
* animacja wybuchu po zbiciu bloku oraz trafieniu przeciwnika,
* menu w grze pozwalające na pauzę, restart, wyjście, a po ukończeniu poziomu przejście do następnego,
* po przegranej zapisywanie wyniku na liście najlepszych wyników o ile liczba punktów jest większa niż ta z pozycji 10.

# Sources:

React Template - https://github.com/burczu

Game Assets - https://craftpix.net