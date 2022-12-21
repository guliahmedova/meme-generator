import React from "react"

export default function Meme() {

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })

    const[allMemes, setAllMemes] = React.useState({})

    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
    }, [])

    function getMemeImage(){
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme=>({
            ...prevMeme,
            randomImage: url
        }))
    }

    function hadnleChange(event){
        const {name, value} = event.target
        setMeme(prevMeme=>({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <main>
            <div className="form">
                <input type="text" name="topText" value={meme.topText} onChange={hadnleChange} className="form--input" />
                <input type="text" name="bottomText" value={meme.bottomText} onChange={hadnleChange} className="form--input" />
                <button className="form--btn" onClick={getMemeImage}>Get A New Meme Image</button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} alt="photo" className="meme--image" />
                <h1 className="meme-text top">{meme.topText}</h1>
                <h1 className="meme-text bottom">{meme.bottomText}</h1>
            </div>
        </main>
    )
}