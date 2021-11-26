## Akseptansekriterier gitt av kunden

- Startsiden skal vise en liste med X antall luker. Denne siden skal ivareta designet gitt av kunden.

- Luker som du allerede har åpnet skal markeres med fargekoden `#96E8C5` (grønnaktig farge). Slik identifiserer du at luken har blitt åpnet av deg.

- Luker som ikke er åpnet, men som er tilgjengelig skal være hvite

- Luker som ikke er tilgjengelig skal være dus grå og markert med `Åpner om X dager fra dagens dato`

- Det skal være mulig å åpne en luke i henhold til reglene nevnt under

  - Ikke åpne før luken er tilgjengelig
  - Kun åpne luken (få kode) en gang
  - Koden som skjuler seg bak luken skal være en random streng bestående av 4 tall og bokstaver

- Det skal være mulig å navigere til siden `dashboard` av `admin`

  - På denne siden skal admin se en liste over alle deltakere som har åpnet en
  - gitt luke, og deres kode. Denne siden skal ivareta designet gitt av kunden.
  - By default skal det kun vises 3 deltakere
  - Hvis noen som ikke er `admin` besøker siden skal det vises en melding.
  - Meldingen kan f.eks være `Du har ikke tilgang til å se dette innholdet`.
  - På denne siden skal det til hver luke kunne trekkes en tilfeldig superbonusvinner.
    - Det er kun `admin` som kan bruke denne funksjonaliteten fra APIet. Trenger ikke å lagre resultatet fra trekking da kunden i fremtiden vil maile den som vinner.

- Det skal i applikasjonen gis hensiktsmessige feilmeldinger og statuskoder.
