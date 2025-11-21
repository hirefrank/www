interface YouTubeEmbedProps {
  videoId: string
  start?: number
}

export function YouTubeEmbed({ videoId, start = 0 }: YouTubeEmbedProps) {
  return (
    <div className="video-container">
      <div className="video-wrapper">
        <iframe
          className="video"
          src={`//www.youtube.com/embed/${videoId}?start=${start}`}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="YouTube video"
        />
      </div>
    </div>
  )
}
