import classes from "./contact-form.module.css";
import {useState} from "react";
import Notification from "../ui/notification";

export default function ContactForm() {

    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredName, setEnteredName] = useState('');
    const [enteredMessage, setEnteredMessage] = useState('');

    const [requestStatus, setRequestStatus] = useState(''); // {status: 'pending', error: null}
    const [requestError, setRequestError] = useState();

    let notification;

    if (requestStatus === 'pending') {
        notification = {
            status: 'pending',
            title: 'Sending message...',
            message: 'Your message is on its way!'
        }
    } else if (requestStatus === 'success') {
        notification = {
            status: 'success',
            title: 'Success!',
            message: 'Message sent successfully!'
        }
    } else if (requestStatus === 'error') {
        notification = {
            status: 'error',
            title: 'Error!',
            message: requestError
        }
    }

    async function sendContactData() {
        const response = await fetch('/api/contact', {
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmail,
                name: enteredName,
                message: enteredMessage
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }

        return response.json();

    }

    async function sendMessageHandler(event) {
        event.preventDefault();
        try {
            event.preventDefault();
            setRequestStatus('pending');
            await sendContactData();
            setRequestStatus('success');
        } catch (e) {
            setRequestError(e.message);
            setRequestStatus('error');
        }
    }

    return (
        <section className={classes.contact}>
            <h1>How can I help you?</h1>
            <form className={classes.form} onSubmit={sendMessageHandler}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor="email">Your Email</label>
                        <input type="email" id="email"
                               required value={enteredEmail}
                               onChange={event => setEnteredEmail(event.target.value)}
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="name">Your Name</label>
                        <input type="text" id="name" required value={enteredName}
                               onChange={event => setEnteredName(event.target.value)}
                        />
                    </div>

                    <div className={classes.control}>
                        <label htmlFor="message">Your Message</label>
                        <textarea id="message" rows="5" value={enteredMessage}
                                  onChange={event => setEnteredMessage(event.target.value)}
                        />
                    </div>

                    <div className={classes.actions}>
                        <button>Send Message</button>
                    </div>
                </div>
            </form>

            {notification && (
                <Notification
                    title={notification.title}
                    message={notification.message}
                    status={notification.status}
                />
            )}
        </section>
    );
}