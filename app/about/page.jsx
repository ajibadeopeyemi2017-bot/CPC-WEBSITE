import Image from 'next/image';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { CHURCH } from '../../lib/site-config';
import PageHeader from '../../components/ui/PageHeader';
import Container from '../../components/ui/Container';
import SectionHeader from '../../components/ui/SectionHeader';
import Eyebrow from '../../components/ui/Eyebrow';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import CtaBand from '../../components/ui/CtaBand';

export const metadata = {
  title: 'About Us | Christ The Potter Church',
  description:
    'The vision, doctrine, leadership and order of Christ The Potter Church, Ile-Ife — teaching men to walk in the reality of who Christ is.',
};

const vision = [
  {
    title: 'Walk in the Reality of Christ',
    body: 'To teach men everywhere to walk in the experiential, day-to-day reality of who Christ is — awakening believers to their full inheritance and identity in Him.',
  },
  {
    title: 'Equip Mature Believers',
    body: 'To teach, train, and equip mature believers for the work of the ministry, raising skilled labourers who function effectively in their unique spiritual graces.',
  },
  {
    title: 'Reach the Unsaved',
    body: 'To reach unbelievers and non-churchgoers with passionate evangelism and compassionate community outreach carrying the transformative Good News of Jesus.',
  },
  {
    title: 'Restore Divine Order',
    body: 'To correct abnormalities and errors among leaders in the Body of Christ, providing doctrinal balance, ministerial accountability, and spiritual fathering.',
  },
];

const blocks = [
  {
    label: 'Block 01 · Kingdom unity',
    title: 'Body of Christ & Ministers',
    body: 'National conferences (KYMC & AGOTE) where fathers and seasoned ministers impart young leaders, giving balance to the coming generation so they avoid error.',
  },
  {
    label: 'Block 02 · Purpose & vocation',
    title: 'Youth Programmes & Summits',
    body: "Empowering youths, professionals, and students through the Realised Destiny Summit to uncover their calling, align with God's expected end, and run their race lawfully.",
  },
  {
    label: 'Block 03 · Local assembly',
    title: 'The Church in Ile-Ife',
    body: 'Sunday Celebration, Tuesday School of Prayer, Thursday Revelational Hour, soul-winning outreaches, and foundational discipleship at the main auditorium.',
  },
];

const tenets = [
  {
    title: 'The Triune God',
    scripture: 'Ephesians 4:5-6, Genesis 1:26, Matthew 3:16-17',
    summary: 'We believe in one true God, eternally existing and revealed in three distinct co-equal persons: the Father, the Son, and the Holy Spirit.',
  },
  {
    title: 'The Infallible Word of God',
    scripture: '2 Timothy 3:16, 2 Peter 1:20-21',
    summary: 'We believe the Holy Bible is the fully inspired, infallible, and written Word of God, serving as the supreme and final authority for Christian faith, doctrine, and living.',
  },
  {
    title: 'The Deity & Incarnation of Jesus',
    scripture: 'John 1:1-4, Matthew 1:18-25, Luke 1:30-35',
    summary: 'We believe Jesus Christ is true God and true man, conceived of the Holy Ghost, born of the Virgin Mary, lived a sinless life, and is the only Saviour of mankind.',
  },
  {
    title: 'Redemption by the Blood',
    scripture: 'Ephesians 2:8, 2 Corinthians 5:18, John 1:12, Acts 3:19',
    summary: 'We believe that cleansing from sin and reconciliation with God is accomplished solely through repentance and faith in the sacrifice and shed blood of Jesus on the Cross.',
  },
  {
    title: 'Bodily Resurrection & Ascension',
    scripture: 'Luke 24:36-40, John 20:25-29, Matthew 28:29-30',
    summary: 'We believe Jesus physically rose from the grave in victory over death, ascended visibly into heaven, and sits at the right hand of the Father as our High Priest.',
  },
  {
    title: 'Baptism in Water & Holy Ghost',
    scripture: 'Acts 1:8, Acts 2:4, Acts 4:5-12, Matthew 28:19',
    summary: 'We believe in water baptism by immersion and the baptism of the Holy Spirit with the evidence of speaking with other tongues and supernatural divine enablement.',
  },
  {
    title: 'Abundant Life & Divine Healing',
    scripture: 'Colossians 1:13, Galatians 5:1, Matthew 8:17b, 1 Peter 2:24',
    summary: "We believe Christ's redemptive work provides complete deliverance, abundant life, and divine physical healing, liberating believers from curses, sin, and poverty.",
  },
  {
    title: 'Sanctification & Holy Living',
    scripture: 'Romans 15:16, 1 Corinthians 6:11, Titus 2:5',
    summary: 'We believe regeneration by the Holy Spirit produces holiness, righteous character, and continuous sanctification to manifest the fruit of the Spirit.',
  },
  {
    title: 'Tithing & Honouring God',
    scripture: 'Malachi 3:8-12, 2 Corinthians 9:6-7, Proverbs 3:9',
    summary: 'We believe tithes and offerings are covenant expressions of our love, gratitude, and honour toward God, establishing divine blessing and kingdom stewardship.',
  },
  {
    title: 'The Rapture & Eternal Judgment',
    scripture: '1 Thessalonians 4:16-17, Revelation 20:11-15, 1 Corinthians 15:12-23',
    summary: 'We believe in the imminent rapture of the Church, the literal second coming of Christ, and the final resurrection of the saved to everlasting life and the lost to eternal judgment.',
  },
];

const leadership = [
  {
    role: 'The Set Man & President',
    officer: 'Apostle Oluwafunminiyi Samson Olufisayo',
    duty: 'Visionary leader, apostolic teacher, and shepherd bearing the primary spiritual mandate from God for Christ The Potter Church.',
  },
  {
    role: 'Vice President & General Coordinator',
    officer: 'Rev. (Mrs.) Olamide Olufisayo',
    duty: 'Overall coordinator of all CPC affairs, operations, pastoral counsel, and executive administrative oversight.',
  },
  {
    role: 'Senior Associate Pastors',
    officer: 'State & Regional Directorate',
    duty: 'Overseers of the CPC vision expansion across states and regional outreach fellowships.',
  },
  {
    role: 'Pastors & Ministry Elders',
    officer: 'Elders Council & Helps Ministry',
    duty: 'Local assembly pastoral duties, church administration, and pastoral care for departments.',
  },
  {
    role: 'Departmental Captains & Group Leaders',
    officer: 'Family Head Units & Committees',
    duty: 'Overseeing spiritual health, discipleship, and the practical execution of church services and member fellowship.',
  },
  {
    role: 'Faithful Stewards & Workers',
    officer: 'Serving Brethren',
    duty: 'Labourers serving in ushering, choir, media, technical, sanitation, hospitality, and evangelism.',
  },
];

const protocols = [
  {
    title: "Foundational Believers' Class",
    body: 'Every member goes through the foundational curriculum covering basic doctrine, salvation certainty, spiritual warfare, and kingdom responsibility before taking up ministry assignments.',
  },
  {
    title: 'AMITES Ministerial School',
    body: "The Acquiring Ministers' Teaching School provides modular apostolic training for five-fold ministers, church workers, and those who perceive God's calling on their lives.",
  },
  {
    title: 'Covenant Relationship & Purity',
    body: 'We uphold moral purity and godly relationships. Courtship begins with pastoral prayers and pre-marital counselling, with no sexual compromise.',
  },
  {
    title: 'Life Milestones & Consecrations',
    body: 'Protocols guide child namings, dedications, marriages, house and business dedications, and first-fruit consecration for spiritual covering and fruitfulness.',
  },
];

const pad = (n) => String(n).padStart(2, '0');

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Moulded by truth."
        highlight="Walking in reality."
        intro={`“${CHURCH.tagline}” A biblical, prophetic, and apostolic house in Ile-Ife, Nigeria, committed to deep doctrine, righteous character, and divine destiny.`}
        image="/images/pastor-action.jpg"
        imageAlt="Apostle Oluwafunminiyi Olufisayo"
      />

      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeader
            eyebrow="God-given blueprint"
            title="Our four-fold vision"
            aside="As set out in the church constitution, our ministry is driven by four pillar mandates to glorify Jesus Christ."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {vision.map((item, i) => (
              <Card key={item.title} className="p-7">
                <span className="font-display text-4xl text-brand-600">{pad(i + 1)}</span>
                <h3 className="mt-5 font-display text-2xl uppercase leading-none text-ink-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-950/70">{item.body}</p>
              </Card>
            ))}
          </div>

          <div className="mt-20 lg:mt-28">
            <SectionHeader
              eyebrow="Operational blueprint"
              title="The three blocks"
              aside="The ministry works across three spheres to establish believers from personal salvation to national kingdom leadership."
            />
            <div className="grid gap-5 md:grid-cols-3">
              {blocks.map((block) => (
                <div key={block.title} className="border-t-2 border-brand-600 pt-6">
                  <p className="text-[0.64rem] font-bold uppercase tracking-[0.25em] text-brand-600">{block.label}</p>
                  <h3 className="mt-3 font-display text-2xl uppercase leading-none text-ink-950">{block.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-950/70">{block.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section
        id="doctrine"
        className="scroll-mt-20 bg-ink-950 py-28 text-white [clip-path:polygon(0_48px,100%_0,100%_calc(100%_-_48px),0_100%)] lg:py-36"
      >
        <Container>
          <SectionHeader
            tone="light"
            eyebrow="Sound doctrine"
            title="Tenets of faith"
            aside="Anchored on the unadulterated Word of God — what we believe, preach, and defend as Christ The Potter Church."
          />
          <ol className="grid gap-x-12 md:grid-cols-2">
            {tenets.map((item, i) => (
              <li key={item.title} className="flex gap-5 border-t border-white/15 py-7">
                <span className="font-display text-3xl text-brand-300">{pad(i + 1)}</span>
                <div>
                  <h3 className="font-display text-2xl uppercase leading-none">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">{item.summary}</p>
                  <p className="mt-3 text-[0.64rem] font-bold uppercase tracking-[0.2em] text-brand-300">{item.scripture}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="relative aspect-[4/5] overflow-hidden bg-ink-950">
              <Image
                src="/images/pastor-oluwafunminiyi.jpg"
                alt="Apostle Oluwafunminiyi Olufisayo"
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover object-top"
              />
            </div>
            <div>
              <Eyebrow>Our lead pastors</Eyebrow>
              <h2 className="mt-4 font-display text-[2.4rem] uppercase leading-[0.95] text-ink-950 sm:text-5xl">
                Apostle &amp; Rev. (Mrs)
                <span className="block text-brand-600">Oluwafunminiyi Olufisayo</span>
              </h2>
              <p className="mt-6 leading-relaxed text-ink-950/80">
                <strong className="font-semibold text-ink-950">Apostle Oluwafunminiyi Olufisayo</strong> is an ordained
                minister of the gospel, called and sent as a conference speaker and life trainer with an apostolic teaching
                mandate to teach men to walk in the reality of who Christ is.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-950/70">
                He is passionate about seeing the order of God established in the local and global Church, and his teaching
                has shaped countless believers and emerging ministers. He is the President of {CHURCH.ministryArm} and the
                Set Man of {CHURCH.name}.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-950/70">
                He is married to <strong className="font-semibold text-ink-950">Rev. Mrs. Olamide Olufisayo</strong>, who
                serves with him as Vice President and coordinator of church affairs. They live in Ile-Ife, Osun State, with
                their children, Aquila and Paul.
              </p>
              <div className="mt-8 border-l-2 border-brand-600 pl-5">
                <p className="text-[0.64rem] font-bold uppercase tracking-[0.25em] text-brand-600">
                  Ministry arm · OSOM mandate
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-950/70">
                  The apostolic umbrella that convenes AGOTE, the Kingdom Young Ministers Conference, Jesus and His Men
                  Conference (JAHMEC), the Realised Destiny Summit, and the AMITES teaching school.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container>
          <SectionHeader
            eyebrow="Biblical order"
            title="Church government"
            aside="“Let all things be done decently and in order.” Authority at CPC flows to nurture, protect, and release spiritual gifts."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {leadership.map((level, i) => (
              <Card key={level.role} className="p-7">
                <span className="font-display text-3xl text-brand-600">{pad(i + 1)}</span>
                <h3 className="mt-4 font-display text-xl uppercase leading-tight text-ink-950">{level.role}</h3>
                <p className="mt-2 text-[0.64rem] font-bold uppercase tracking-[0.2em] text-brand-600">{level.officer}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-950/70">{level.duty}</p>
              </Card>
            ))}
          </div>

          <div className="mt-20 lg:mt-28">
            <SectionHeader
              eyebrow="Stewardship"
              title="Protocols in the house"
              aside="1 Corinthians 14:40 — clear guidelines that cultivate spiritual growth, family integrity, and ministerial excellence."
            />
            <div className="grid gap-5 md:grid-cols-2">
              {protocols.map((item) => (
                <Card key={item.title} className="flex gap-5 p-7">
                  <ShieldCheck size={22} strokeWidth={1.75} className="mt-0.5 shrink-0 text-brand-600" />
                  <div>
                    <h3 className="font-display text-xl uppercase leading-tight text-ink-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-950/70">{item.body}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        eyebrow="Talk to us"
        title="Need pastoral counsel"
        highlight="or have questions?"
        body="Speak directly with our ministerial counselling and protocol desk."
      >
        <Button variant="white" size="lg" href={CHURCH.phoneHref}>
          Call {CHURCH.phone}
        </Button>
        <Button variant="outlineLight" size="lg" href="/plan-a-visit">
          Plan your visit
          <ArrowRight size={14} />
        </Button>
      </CtaBand>
    </>
  );
}
