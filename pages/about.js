export default function About(props) {
    return (
        <div>
            <h1 className="text-5xl pl-3">About</h1>
            <br></br>
            <div className="p-3">
                <h2 className="text-3xl font-bold mb-2 text-emerald">Our Goal</h2>
                <p> 
                    Emerald is a risk-pooling utility which provides a trustworthy, decentralised, avenue for 
                    communities to put their money away for rainy days.
                </p>
                <p className="m-2">
                    In short, insurance.
                </p>
                <p>
                    On the upside, users enjoy exclusive control of their assets. No premiums, no costs, just a pool of ether.
                    On the downside, regulation is reduced. Withdrawals are made on the basis of trust.
                    To prevent abuse of the pool system, there are plans for withdrawal amounts will be restricted based on past contributions and
                    users with negative balance will not be allowed to withdraw until they have repaid in full. 
                </p>
                <p className="mt-2">
                    Oh, and, for fun, because I love coding random crap.
                </p>
                <br></br>

                <h2 className="text-3xl font-bold mb-2 text-emerald">Notes on the Demo</h2>
                <p classname="mb-2">
                    This website is only a demo project, created as a fun way for me to learn about smart contracts. 
                    Some functions are not working properly, and others have fallen into disrepair as a result of  
                    large changes to Ethereum after the adoption of the proof-of-stake system.
                </p>
                <p classname="mb-2">
                    The demo only works on the Ethereum Sepolia test network. Gas prices are also far too
                    expensive to make this project viable.
                </p>
                <br />
                <p className="mb-2">
                    Here are some exciting upgrades you can look forward to in the near future!
                </p>
                <ul className="list-disc pl-10">
                    <li>
                        Withdraw more than your deposited amount. So this app can do what it was supposed to.
                        Currently users cannot withdraw more than their deposited amounts.
                    </li>
                    <li>
                        New regulations for depositing and withdrawal.
                    </li>
                    <li>Refresh button, in the event of browser lag.
                    </li>
                </ul>
                <br />
                <p classname="mb-2">
                    You can find my portfolio 
                        <a href="https://portfolio-geraldnyeo.vercel.app"
                            className="pl-1 underline text-emerald">
                            here
                        </a>.
                </p>

                {/*
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
                */}

            </div>
        </div>
    )
}