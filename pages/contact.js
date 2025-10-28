export default function Contact(){
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Контакти</h1>
      <form action="mailto:cazaser.ytro@gmail.com" method="post" encType="text/plain" className="space-y-3 max-w-lg">
        <input name="name" placeholder="Ім'я" className="w-full p-2 rounded bg-[#071023]" />
        <input name="email" placeholder="Email" className="w-full p-2 rounded bg-[#071023]" />
        <textarea name="message" placeholder="Повідомлення" className="w-full p-2 rounded bg-[#071023]" />
        <button className="px-4 py-2 bg-accent text-black rounded">Надіслати</button>
      </form>
    </div>
  )
}
