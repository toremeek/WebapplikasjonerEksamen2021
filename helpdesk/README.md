# Oppgave 1 - Helpdesk

## API

### Endepunkter

`GET /api/issues`
: Henter alle issues

`POST /api/issues`
: Legger til en ny issue
: `body` må inneholde:

```
{
	"title": "Test 1",
	"description": "Lorem lorm",
	"creator": "Pål Peiling",
	"severity": 3,
	"department": "IT"
}
```

**Merk:** `department` er case sensitiv
