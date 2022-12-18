import classes from './hero.module.css'
import Image from "next/image";

function Hero() {
    return (
        <div className={classes.hero}>
            <section>
                <div className={classes.image}>
                    <Image
                        src="/images/site/hero.png"
                        alt='An Image of Sameer'
                        width={300}
                        height={300}
                        layout="responsive"
                    />
                </div>
                <h1> Hi, I am Sameer</h1>
                <p>
                    I am just cool.
                </p>
            </section>
        </div>
    )
}

export default Hero;