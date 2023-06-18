import Link from 'next/link';

export default function Home(props) {
  return (
    <div className="flex flex-col">
      <h1 className="text-center text-5xl font-roboto">SAVE MONEY TOGETHER</h1>
      <br></br>
      <p className="text-center text-sm font-open-sans">A blockchain community financing tool. Powered by Etheruem and Metamask.</p>
      <p className="my-10"></p>
      <div className="flex justify-center items-center">
        <Link href="/pools">
          <a className="text-center text-base text-emerald font-open-sans px-5 py-3 border border-emerald transition duration-500 hover:bg-emerald hover:text-white">Find Pools Now!</a>
        </Link>
      </div>
    </div>
  )
}
