export default function Help(props) {
    return (
        <div>
            <h1 className="text-5xl font-bold p-2">Help!</h1>
            <br></br>
            <div className="p-3">
                <h2 className="text-3xl font-bold mb-3 text-emerald">Web3 Worries</h2>

                <h3 className="text-xl font-bold mb-2">I don&apos;t know anything about Web 3!</h3>
                <p>
                    You don&apos;t need to be a Web 3 expert to use Emerald. However, we do recommend having some basic knowledge, so
                    you know what is happening to your money.
                </p>
                <br></br>

                <h3 className="text-xl font-bold mb-2">So, how do I start an account?</h3>
                <p>
                    Instead of traditional authentication, Emerald uses Metamask to verify its users. You don&apos;t need an account - 
                    just a Metamask wallet!
                </p>
                <h4 className="font-bold my-2">Creating a Metamask account</h4>
                <p>
                    Setting up a metamask account shouldn&apos;t be too hard... Here&apos;s a useful link to get you started:
                    <a href="https://metamask.zendesk.com/hc/en-us/articles/360015489531-Getting-started-with-MetaMask"
                        className="pl-1 underline text-emerald">
                        getting started with metamask
                    </a>
                    . If you still require any help, we&apos;ll update this page <i>&quot;soon...&quot;</i>
                </p>
                <p></p>
                <br></br>

                <h3 className="text-xl font-bold mb-2">I don&apos;t have any ETH...</h3>
                <p>
                    Don&apos;t worry! Currently, Emerald is only running on the Goerli Test Network, for testing purposes. You can 
                    get ETH on this network for free!
                    <a href="https://www.alchemy.com/overviews/goerli-faucet"
                        className="pl-1 underline text-emerald">
                        Here&apos;s how
                    </a>
                    .
                </p>
                <p className="font-bold italic my-2">
                    Will I have to invest in Ether in the future?
                </p>
                <p>
                    Nope. The developers here at Emerald are really, really lazy. We&apos;ll probably never release a proper version
                    of Emerald. So have fun with your fake money!
                </p>
                <br></br>

                <h3 className="text-xl font-bold mb-2">Help! It isn&apos;t working!</h3>
                <h4 className="font-bold my-2">Check your Metamask network</h4>
                <p>
                    Currently, Emerald is only running on the Goerli Test Network - did you remember to switch your network?
                </p>
                <br></br>
            </div>

            <div className="p-3">
                <h2 className="text-3xl font-bold mb-3 text-emerald">Emerald Entreaties</h2>

                <h3 className="text-xl font-bold mb-2"></h3>
                <p>
                </p>
                <br></br>
            </div>
        </div>
    )
}