interface ProfileImageProps {
  src: string
  alt: string
}

export function ProfileImage({ src, alt }: ProfileImageProps) {
  return (
    <div className="profile-image">
      <img alt={alt} src={src} />
    </div>
  )
}
