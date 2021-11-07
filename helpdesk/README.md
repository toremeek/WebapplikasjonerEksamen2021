# Oppgave 1 - Helpdesk

## API

Status kode `200 - OK` og `201 - CREATED` returnerer:

```JavaScript
{
  success: true,
  data: [
    {
      ...
    }
  ]
}
```

**Merk:** data listen kan være tom, eks. ved at det ikke finnes noe issues når det filtreres.

Ved feil `400 - BAD REQUEST` eller `500 - SERVER ERROR` returneres:

```JavaScript
{
  success: false,
  error: "Bad request 💀"
}
```

### Endepunkter

| Metode          | URL                              | Beskrivelse                                              | Ferdig | Merknad                                            |
| --------------- | -------------------------------- | -------------------------------------------------------- | :----: | -------------------------------------------------- |
| `GET`           | `/api/issues`                    | Henter alle issues                                       |   ✔️   | Bør også hente antall kommentarer og avdelingsnavn |
| `POST`          | `/api/issues`                    | Legger til en ny issue **[1]**                           |   ❌   | Mangler inputvalidering                            |
| `GET`           | `/api/issues/{id}`               | Henter alle verdier for issue med `id`                   |   ❌   | Returnerer bare issue - må joine tabeller          |
| `PUT` / `PATCH` | `/api/issues/{id}`               | Merker en issue som løst                                 |   ❌   | Ikke implementert                                  |
| `GET`           | `/api/issues/{id}/comments`      | Henter alle kommentarer til issue med `id`               |   ✔️   | Virker ok - endre på objektet?                     |
| `POST`          | `/api/issues/{id}/comments`      | Legger til kommentar til issue med `id` **[2]**          |   ❌   | Mangler inputvalidering                            |
| `GET`           | `/api/issues/{resource}/{value}` | Henter issues med `resource` lik `value` (case sensitiv) |   ❌   | Returnerer alle når value ikke finnes              |

**[1]:** `body` må inneholde:

```JSON
{
  "title": "Test 1",
  "description": "Lorem lorm",
  "creator": "Pål Peiling",
  "severity": 3,
  "department": "IT"
}
```

**Merk:** `department` er case sensitiv

**[2]:** `body` må inneholde:

```JSON
{
  "comment": "Hvem liker 🍍 på 🍕?"
}

```
