import Logo from "./logo";
import Link from "next/link";
import classes from "./main-navigation.module.css";

export default function MainNavigation(props) {
    return <header className={classes.header}>
        <Link href="/">
            <Logo/>
        </Link>
        <div>
            <ul>
                <Link href="/posts"> Posts </Link>
                <Link href="/contact"> Contact </Link>
            </ul>

        </div>
    </header>

}