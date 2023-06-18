export default function About(props) {
    return (
        <div>
            <h1 className="text-5xl pl-3">About</h1>
            <br></br>
            <div className="p-3">
                <h2 className="text-3xl font-bold mb-2 text-emerald">Our Goal</h2>
                <p> 
                    Emerald is a community risk-pooling utility which provides a trustworthy, decentralised, avenue to -
                </p>
                <p className="m-2">
                    <i>nah, it&apos;s just free insurance.</i>
                </p>
                <p>
                    Users enjoy exclusive control of their assets. No premiums, no costs, just a pool of ether from which 
                    even the government can&apos;t help you retrieve your money.
                </p>
                <p className="mt-2">
                    Oh, and, for fun, because I love coding random crap.
                </p>
                <br></br>

                <h2 className="text-3xl font-bold mb-2 text-emerald">Header</h2>
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

                <h2 className="text-3xl font-bold mb-2 text-emerald">New Features Coming Soon!</h2>
                <p className="mb-2">
                    Here are some exciting upgrades you can look forward to in the near future!
                </p>
                <ul className="list-disc pl-10">
                    <li>Withdraw more than your deposited amount. So this app can do what it was supposed to.</li>
                    <li>Refresh button. You don&apos;t know it, but there's some real poor code behind the scenes, which could lag
                        your browser.
                    </li>
                </ul>

            </div>
        </div>
    )
}