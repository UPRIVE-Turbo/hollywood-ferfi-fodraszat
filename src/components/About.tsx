import Image from 'next/image'

export function About() {
  return (
    <section id="rolunk" className="w-full bg-cream px-4 py-24 md:py-32">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-16 lg:grid lg:grid-cols-2 lg:gap-24">
        <div className="reveal-up relative aspect-[4/5] w-full md:aspect-square lg:aspect-[4/5]">
          <div className="absolute -right-8 top-8 hidden h-full w-full border-2 border-gold md:block" />
          <Image
            src="https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?auto=format&fit=crop&w=1200&q=80"
            alt="Borbély szalon részlet, férfi hajvágás"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="relative z-10 object-cover grayscale-[50%] transition-all duration-700 hover:grayscale-0"
          />
        </div>

        <div className="reveal-up stagger-1 flex flex-col justify-center">
          <span className="mb-4 block font-heading text-sm tracking-[0.3em] text-gold uppercase">
            A mesterségünk
          </span>
          <h2 className="mb-8 font-heading text-5xl leading-[0.9] font-bold tracking-tighter text-anthracite uppercase md:text-7xl">
            Több, mint <br />
            egy hajvágás. <br />
            <span className="text-gold">Hagyomány.</span>
          </h2>

          <div className="space-y-6 font-body text-lg leading-relaxed text-darkgray/80 md:text-xl">
            <p>
              A Hollywood Férfi Fodrászatban nem futószalagon gyártjuk a frizurákat. Ide azért
              jössz, hogy kiszakadj a rohanásból, igyál egy jó kávét, és ránk bízd a megjelenésed.
            </p>
            <p>
              Borbélyaink szenvedéllyel és maximális precizitással dolgoznak. A klasszikus ollós
              vágástól a legmodernebb fade átmenetekig, és a hagyományos pengés borotválásig
              mindenben a legmagasabb minőséget nyújtjuk Miskolc belvárosában.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-anthracite/10 pt-12">
            <div>
              <h4 className="mb-2 font-heading text-3xl font-bold text-anthracite">10+</h4>
              <p className="font-body text-xs font-bold tracking-widest text-darkgray/60 uppercase">
                Év Tapasztalat
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-heading text-3xl font-bold text-anthracite">100%</h4>
              <p className="font-body text-xs font-bold tracking-widest text-darkgray/60 uppercase">
                Férfi Környezet
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
