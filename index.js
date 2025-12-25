async function fetchData() {
    try {
        document.getElementById("msg").textContent = ""

        const name = document.getElementById("name").value.toLowerCase()
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)

        if (!response.ok) throw new Error("Pokémon not found!")

        const data = await response.json()

        const cardDiv = document.getElementById("pokemonCard")
        const img = document.getElementById("pokeImage")
        const pokeName = document.getElementById("pokeName")
        const id = document.getElementById("pokeId")
        const height = document.getElementById("pokeHeight")
        const weight = document.getElementById("pokeWeight")
        const typesDiv = document.getElementById("types")
        const hp = document.getElementById("hp")
        const attack = document.getElementById("attack")
        const defense = document.getElementById("defense")
        const speed = document.getElementById("speed")

        cardDiv.style.display = "block"

        pokeName.textContent = data.name[0].toUpperCase() + data.name.slice(1)
        img.src = data.sprites.front_default
        id.textContent = data.id
        height.textContent = (data.height / 10).toFixed(1)
        weight.textContent = (data.weight / 10).toFixed(1)

        typesDiv.innerHTML = ""
        data.types.forEach(t => {
            const span = document.createElement("span")
            span.textContent = t.type.name
            span.classList.add("type", t.type.name)
            typesDiv.appendChild(span)
        })

        hp.textContent = data.stats[0].base_stat
        attack.textContent = data.stats[1].base_stat
        defense.textContent = data.stats[2].base_stat
        speed.textContent = data.stats[5].base_stat

    } catch (err) {
        document.getElementById("msg").textContent = err.message
        document.getElementById("pokemonCard").style.display = "none"
    }
}

document.getElementById("searchForm").addEventListener("submit", (event) => {
    event.preventDefault()
    fetchData()
})
