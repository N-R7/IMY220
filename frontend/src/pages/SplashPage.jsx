import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const SplashPage = () => {
    return (
        <main style={styles.page}>

            <div style={styles.hero}>
                <h1 style={styles.title}>
                    Capture
                </h1>

                <p style={styles.tagline}>
                    Creating memories one shot at a time
                </p>

                <p style={styles.caption}>
                    Share your adventures, collect moments,
                    connect with friends, and build your
                    own digital scrapbook.
                </p>
            </div>

            <div style={styles.forms}>
                <div style={styles.formCard}>
                    <LoginForm />
                </div>

                <div style={styles.formCard}>
                    <SignupForm />
                </div>
            </div>

        </main>
    );
};

const styles = {
    page: {
        minHeight: '100vh',
        background:
            'linear-gradient(to bottom, #f5efe6, #ede0d4)',
        padding: '40px',
        boxSizing: 'border-box'
    },

    hero: {
        textAlign: 'center',
        marginBottom: '60px'
    },

    title: {
        fontFamily: '"Pacifico", cursive',
        fontSize: '90px',
        color: '#8b5e3c',
        margin: 0,
        lineHeight: '1.2'
    },

    tagline: {
        fontSize: '28px',
        color: '#5c4033',
        fontWeight: 'bold',
        marginTop: '25px',
        marginBottom: '30px'
    },

    caption: {
        maxWidth: '700px',
        margin: '0 auto',
        color: '#6d5d4f',
        fontSize: '18px',
        lineHeight: '1.6'
    },

    forms: {
        display: 'flex',
        justifyContent: 'center',
        gap: '40px',
        flexWrap: 'wrap'
    },

    formCard: {
        backgroundColor: '#fffaf2',
        padding: '25px',
        borderRadius: '20px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
        minWidth: '400px'
    }
};

export default SplashPage;