export default function About(props) {
    return (
        <div>
            <h1 className="text-5xl">About</h1>
            <br></br>
            <div className="p-3">
                <h2 className="text-xl font-bold mb-2">Our Goal</h2>
                <p>
                    paragraph
                </p>
                <br></br>

                <h2 className="text-xl font-bold mb-2">Header</h2>
                <p>
                    Paragraph
                </p>
                <h3 className="font-bold my-2">Subheader</h3>
                <p>
                    Paragraph
                    <a href="https://metamask.zendesk.com/hc/en-us/articles/360015489531-Getting-started-with-MetaMask"
                        className="pl-1 underline text-emerald">
                        link
                    </a>
                    paragraph (cont.)
                </p>
                <p></p>
                <br></br>

            </div>
        </div>
    )
}