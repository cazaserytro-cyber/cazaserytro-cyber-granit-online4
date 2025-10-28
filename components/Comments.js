import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Comments({productId}){
  const [comments, setComments] = useState([])
  const [text, setText] = useState('')
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const u = localStorage.getItem('gr_user')
    if(u) setUser(JSON.parse(u))
    fetchComments()
  },[])

  async function fetchComments(){
    const res = await axios.get(`/api/comments?productId=${productId}`)
    setComments(res.data.comments || [])
  }

  async function postComment(e){
    e.preventDefault()
    if(!user){ alert('Будь ласка, увійдіть, щоб залишити коментар'); return }
    await axios.post('/api/comments', { productId, text }, { headers: { Authorization: 'Bearer '+user.token } })
    setText('')
    fetchComments()
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Коментарі</h3>
      <form onSubmit={postComment} className="mb-4">
        <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full p-2 rounded bg-[#071023]" rows="3" />
        <button className="mt-2 px-3 py-1 border rounded">Надіслати</button>
      </form>
      <div className="space-y-4">
        {comments.map(c => (
          <div key={c._id} className="p-3 bg-[#071023] rounded">
            <div className="text-sm text-gray-400">{c.userEmail} • {new Date(c.createdAt).toLocaleString()}</div>
            <div className="mt-1">{c.text}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
