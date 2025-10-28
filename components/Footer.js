export default function Footer(){
  const year = new Date().getFullYear();
  return (
    <footer className="bg-granite/90 mt-12 text-sm">
      <div className="container px-4 py-8 text-gray-300">
        <div>© {new Date().getFullYear()} Granit Online — Вироби з каменю. Контакт: cazaser.ytro@gmail.com</div>
      </div>
    </footer>
  )
}
