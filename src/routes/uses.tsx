import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/uses')({
  component: UsesPage,
  head: () => ({
    meta: [
      { title: "Uses - Frank Harris" },
      { name: "description", content: "Software, gadgets, and tools Frank Harris uses for productivity, development, and design." },
      { property: "og:title", content: "Uses - Frank Harris" },
      { property: "og:description", content: "Software, gadgets, and tools Frank Harris uses for productivity, development, and design." },
    ],
  }),
})

function UsesPage() {
  return (
    <div className="main-container simple-content">
      <h1>Uses</h1>

      <p>
        Software I use, gadgets I love, and other things I recommend. I get asked a lot
        about the things I use to build software, stay productive, or buy to fool myself
        into thinking I'm being productive when I'm really just procrastinating.
      </p>

      <h2>Workstation</h2>

      <ul>
        <li>
          <strong>16" MacBook Pro, M1 Max, 64GB RAM (2021)</strong> I was using an
          Intel-based 16" MacBook Pro prior to this and the difference is night and day.
          I've never heard the fans turn on a single time, even under the incredibly
          heavy loads I put it through with our various launch simulations.
        </li>
        <li>
          <strong>Apple Pro Display XDR (Standard Glass)</strong> The only display on the
          market if you want something HiDPI and bigger than 27". When you're working at
          planetary scale, every pixel you can get counts.
        </li>
        <li>
          <strong>IBM Model M SSK Industrial Keyboard</strong> They don't make keyboards
          the way they used to. I buy these any time I see them go up for sale and keep
          them in storage in case I need parts or need to retire my main.
        </li>
        <li>
          <strong>Apple Magic Trackpad</strong> Something about all the gestures makes me
          feel like a wizard with special powers. I really like feeling like a wizard
          with special powers.
        </li>
        <li>
          <strong>Herman Miller Aeron Chair</strong> If I'm going to slouch in the worst
          ergonomic position imaginable all day, I might as well do it in an expensive
          chair.
        </li>
      </ul>

      <h2>Development tools</h2>

      <ul>
        <li>
          <strong>Sublime Text 4</strong> I don't care if it's missing all of the fancy
          IDE features everyone else relies on, Sublime Text is still the best text
          editor ever made.
        </li>
        <li>
          <strong>iTerm2</strong> I'm honestly not even sure what features I get with
          this that aren't just part of the macOS Terminal but it's what I use.
        </li>
        <li>
          <strong>TablePlus</strong> Great software for working with databases. Has saved
          me from building about a thousand admin interfaces for my various projects over
          the years.
        </li>
      </ul>

      <h2>Design</h2>

      <ul>
        <li>
          <strong>Figma</strong> We started using Figma as just a design tool but now
          it's become our virtual whiteboard for the entire company. Never would have
          expected the collaboration features to be the real hook.
        </li>
      </ul>

      <h2>Productivity</h2>

      <ul>
        <li>
          <strong>Alfred</strong> It's not the newest kid on the block but it's still the
          fastest. The Sublime Text of the application launcher world.
        </li>
        <li>
          <strong>Reflect</strong> Using a daily notes system instead of trying to keep
          things organized by topics has been super powerful for me. And with Reflect,
          it's still easy for me to keep all of that stuff discoverable by topic even
          though all of my writing happens in the daily note.
        </li>
        <li>
          <strong>SavvyCal</strong> Great tool for scheduling meetings while protecting
          my calendar and making sure I still have lots of time for deep work during the
          week.
        </li>
        <li>
          <strong>Focus</strong> Simple tool for blocking distracting websites when I
          need to just do the work and get some momentum going.
        </li>
      </ul>
    </div>
  )
}
