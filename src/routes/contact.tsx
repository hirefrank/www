import { createFileRoute } from "@tanstack/react-router";
// import { CalendarEmbed } from "~/components/CalendarEmbed";
import { SocialLinks } from "~/components/SocialLinks";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="main-container simple-content">
      <h1>Let's Connect</h1>

      <p>I'm always excited to meet product folks and thoughtful leaders.</p>

      <p>
        Whether you're working through challenges in product strategy, team
        dynamics, or leadership growth, I'd love to help.
      </p>

      <p>(I try to meet someone new every day. Maybe that's you?)</p>

      {/*<CalendarEmbed />*/}

      <SocialLinks />
    </div>
  );
}
