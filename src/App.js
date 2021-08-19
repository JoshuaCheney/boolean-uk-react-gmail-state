import Header from './components/Header'

import initialEmails from './data/emails'

import { useState } from 'react'

import './App.css'

function App() {
  // Use initialEmails for state
  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  console.log('initial Emails: ', initialEmails)

  let filteredEmails = emails

  if (hideRead) {
    filteredEmails = emails.filter(email => !email.read)
  }

  const toggleRead = targetEmail => {
    console.log(`inside toggleread`, targetEmail, emails)

    const updatedEmails = emails.map(email => {
      if (email.id === targetEmail.id) {
        console.log(`correct email`, email, targetEmail.read)

        const updatedEmail = {
          ...targetEmail,
          read: !targetEmail.read
        }

        console.log('updated email', updatedEmail)

        return updatedEmail
      } else {
        return email
      }
    })

    console.log(updatedEmails)

    setEmails(updatedEmails)
  }

  const toggleStar = targetEmail => {
    const updatedEmails = emails.map(email => {
      if (email.id === targetEmail.id) {
        console.log(`starred email`, email, targetEmail.starred)

        const updatedEmail = {
          ...targetEmail,
          starred: !targetEmail.starred
        }

        return updatedEmail
      } else {
        return email
      }
    })
    setEmails(updatedEmails)
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">?</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={event => setHideRead(event.target.checked)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {
            /* Render a list of emails here */
            filteredEmails.map(email => {
              return (
                <li className={email.read ? 'email read' : 'email'}>
                  <div className="select">
                    <input
                      className="select-checkbox"
                      type="checkbox"
                      checked={email.read}
                      onChange={() => toggleRead(email)}
                    />
                  </div>
                  <div className="star">
                    <input
                      className="star-checkbox"
                      type="checkbox"
                      checked={email.starred}
                      onChange={() => toggleStar(email)}
                    />
                  </div>
                  <div className="sender">{email.sender}</div>
                  <div className="title">{email.title}</div>
                </li>
              )
            })
          }
        </ul>
      </main>
    </div>
  )
}

export default App
