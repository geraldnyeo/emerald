export default function Help(props) {
    return (
        <div>
            <h1 className="text-5xl">Help!</h1>
            <br></br>
            <div className="p-3">
                <h2 className="text-xl font-bold mb-2">I don&apos;t know anything about Web 3!</h2>
                <p>
                    You don&apos;t need to be a Web 3 expert to use Emerald. However, we do recommend having some basic knowledge, so
                    you know what is happening to your money. 
                </p>
                <br></br>

                <h2 className="text-xl font-bold mb-2">So, how do I start an account?</h2>
                <p>
                    Instead of traditional authentication, Emerald uses Metamask to verify its users. You don&apos;t need an account - 
                    just a Metamask wallet!
                </p>
                <h3 className="font-bold my-2">Creating a Metamask account</h3>
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

                <h2 className="text-xl font-bold mb-2">I don&apos;t have any ETH...</h2>
                <p>
                    Don&apos;t worry! Currently, Emerald is only running on the Rinkeby Test Network, for testing purposes. You can 
                    get ETH on this network for free! Here&apos;s how:
                </p>
                <p className="font-bold italic my-2">
                    Will I have to invest in Ether in the future?
                </p>
                <p>
                    Nope. The developers here at Emerald are really, really lazy. We&apos;ll probably never release a proper version
                    of Emerald. So have fun with your fake money!
                </p>
                <br></br>

                <h2 className="text-xl font-bold mb-2">Help! It still doesn&apos;t work!</h2>
                <h3 className="font-bold my-2">Check your Metamask network</h3>
                <p>
                    Currently, Emerald is only running on the Rinkeby Test Network - did you remember to switch your network?
                </p>
                <br></br>
            </div>
        </div>
    )
}