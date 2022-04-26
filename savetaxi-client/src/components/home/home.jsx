import classes from './home.module.css';
import logo from './logo.jpeg';

export const Home = () => {
    return (
        <div className={classes.root}>
            <div className={classes.logoContainer}>
                <img className={classes.img} src={logo} alt='SaveTaxi' />
                <div className={classes.name}>SaveTaxi</div>
            </div>
            <div className={classes.about}>
                Save taxi היא פלטפורמה שתעזור לכם למצוא שותפים לנסיעה במונית.
                <br />
                להכיר אנשים חדשים!
                <br />
                לחסוך כסף!
                <br />
                שומרים על הסביבה ומפחיתים את פליטת הפחמן!
                <br /> לפניות ושאלות נא לגשת למייל:
                <br />
                savetaxiofficial@gmail.com
                <br />
                ❤️‍🚖❤️‍❤️‍🚖
            </div>
        </div>
    );
};
