

import axios from 'axios';

// Initialize Google Translate API client

// Fetch data from database (for simplicity, using a static object)
const fetchDataFromDatabase = async () => {
    return {
        "internship": "Internship",
        "jobs": "Jobs",
        "languages": "Languages",
        "login": "Login",
        "register": "Register",
        "title": "Make your dream career a reality",
        "subtitle": "Trending on InternArea ",
        "heading": "Latest internships on Intern Area",
        "popular categories": "POPULAR CATEGORIES ",
        "big brands": "Big Brands",
        "work from home": "Work From Home",
        "part-time": "Part-time",
        "mba": "MBA",
        "engineering": "Engineering",
        "media": "Media",
        "design": "Design",
        "data science": "Data Science",
        "actively hiring": "Actively Hiring",
        "view details": "View Details",
        "footer heading": "Empower your career with InternArea today",
        "hire talent": "Hire Talent",
        "admin": "Admin",
        "search": "Search",
        "Sing-up and Apply For Free": "Sign-up and Apply For Free",
        "1,50,000+ companies hiring on Internshala": "1,50,000+ companies hiring on Internshala",
        "Sign in with Google": "Sign in with Google ",
        "email": "Email",
        "password": "Password",
        "first-name": "First Name",
        "last-name": "LastName",
        "sign up": "Sign Up",
        "already registered": "Already registered",
        "By signing up, you agree to our Term and Conditions.": "By signing up, you agree to our Term and Conditions.",
        "student": "Student",
        "employee and T&P": "Employee and T&P",
        "login with Google": "Login with Google ",
        "forget password": "Forget Password",
        "new to internarea?": "new to internarea?",
        "company": "Company",
        "or": "Or",
        "New York": "New York",
        "Los Angeles": "Los Angeles",
        "Chicago": "Chicago",
        "San Francisco": "San Francisco",
        "Miami": "Miami",
        "Seattle": "Seattle", "About us": "About us",
        "Careers": "Careers",
        "Press": "Press",
        "News": "News",
        "Media kit": "Media kit",
        "Contact": "Contact",
        "Job Places": "Job Places",
        "Blog": "Blog",
        "Newsletter": "Newsletter",
        "Events": "Events",
        "Help center": "Help center",
        "Tutorials": "Tutorials",
        "Supports": "Supports",
        "Jobs by streams": "Jobs by streams",
        "Startups": "Startups",
        "Enterprise": "Enterprise",
        "Government": "Government",
        "Saas": "Saas",
        "Marketplaces": "Marketplaces",
        "Ecommerce": "Ecommerce",
        "Team diary": "Team diary",
        "Terms and conditions": "Terms and conditions",
        "sitemap": "sitemap",
        "Internship by places": "Internship by places",
        "Internship by stream": "Internship by stream",
        "Top Locations": "Top Locations",
        "Profile": "Profile",
        "Top Category": "Top Category",
        "Explore More Internships": "Explore More Internships",
        "Intern at": "Intern at",
        "300K+": "300K+",
        " companies hiring": " companies hiring",
        "10K+": "10K+",
        " new openings everyday": " new openings everyday",
        "21Mn+": "21Mn+",
        " active students": " active students",
        "600K+": "600K+",
        " learners": " learners",
        "Computer Science Internship": "Computer Science Internship",
        "Electronic Internship": "Electronic Internship",
        "Mechanical Internship": "Mechanical Internship",
        "Civil Internship": "Civil Internship",
        "Marketing Internship": "Marketing Internship",
        "Chemical Internship": "Chemical Internship",
        "Finance Internship": "Finance Internship",
        "Summer Research Fellowship": "Summer Research Fellowship",
        "Campus Ambassador Program": "Campus Ambassador Program",
        "We're hiring": "We're hiring",
        "Hire interns for your company": "Hire interns for your company",
        "Post a Job": "Post a Job",
        "Team Diary": "Team Diary",
        "Our Services": "Our Services",
        "Terms & Conditions": "Terms & Conditions",
        "Privacy": "Privacy",
        "Contact us": "Contact us",
        "Sitemap": "Sitemap",
        "College TPO registration": "College TPO registration",
        "List of Companies": "List of Companies",
        "Get Android App": "Get Android App",
        "Copyright": "© Copyright 2024. All Rights Reserved",
        "Made with": "Made with", "by harshak": " by harshak",
        "Marketing Jobs": "Marketing Jobs",
        "Content writing jobs": "Content writing jobs",
        "Web development jobs": "Web development jobs",
        "Sales jobs": "Sales jobs",
        "Finance jobs": "Finance jobs",
        "Digital Marketing jobs": "Digital Marketing jobs",
        "Computer Science jobs": "Computer Science jobs",
        "Graphic Design jobs": "Graphic Design jobs",
        "Data Science jobs": "Data Science jobs",
        "Jobs in Delhi": "Jobs in Delhi",
        "Jobs in Mumbai": "Jobs in Mumbai",
        "Jobs in Bangalore": "Jobs in Bangalore",
        "Jobs in Jaipur": "Jobs in Jaipur",
        "Jobs in Kolkata": "Jobs in Kolkata",
        "Jobs in Hyderabad": "Jobs in Hyderabad",
        "Jobs in Pune": "Jobs in Pune",
        "Jobs in Chennai": "Jobs in Chennai",
        "Jobs in Lucknow": "Jobs in Lucknow",
        "Jobs by Stream": "Jobs by Stream",
        "Jobs by Places": "Jobs by Places",
        "logout": "logout",
        "Continue with Google": "Continue with Google",
        "now": "now",
        "Phone Number": "Phone Number",
        "By signing up, you agree to our": "By signing up, you agree to our",
        "Terms and Conditions": "Terms and Conditions",
        "English": "English",
        "French": "French",
        "Chinese": "Chinese",
        "Hindi": "Hindi",
        "Spanish": "Spanish",
        "Portuguese": "Portuguese",
        "Internship in India": "Internship in India",
        "Internship in Delhi": "Internship in Delhi",
        "Internship in Bangalore": "Internship in Bangalore",
        "Internship in Hyderabad": "Internship in Hyderabad",
        "Internship in Mumbai": "Internship in Mumbai",
        "Internship in Chennai": "Internship in Chennai",
        "Internship in Gurgaon": "Internship in Gurgaon",
        "Internship in Kolkata": "Internship in Kolkata",
        "Internship in Virtual Internship": "Internship in Virtual Internship",
        "Latest jobs on JobArena": "Latest jobs on JobArena",
        "View All Internships": "View All Internships",
        "View all jobs": "View all jobs",
        "Login to post internship, post jobs and view applications.": "Login to post internship, post jobs and view applications.",
        "Name": "Name",
        "Total Applications": "Total Applications",
        "View Applications": "View Applications",
        "Post Job": "Post Job",
        "Post InternShips": "Post InternShips",
        "Post InternShip According To Your Requirements": "Post InternShip According To Your Requirements",
        "Category": "Category",
        "Applied On": "Applied On",
        "Applied By": "Applied By",
        "Application Status": "Application Status",
        "View All Applications": "View All Applications",
        "Company name": "Company name",
        "Cover Letter": "Cover Letter",
        "Application Date": "Application Date",
        "Accept": "Accept",
        "Reject": "Reject",
        "Title": "Title",
        "Location": "Location",
        "AboutCompany": "AboutCompany",
        "AboutJob": "AboutJob",
        "Whocanapply": "Whocanapply",
        "Perks": "Perks",
        "Number Of Opening": "Number Of Opening",
        "CTC": "CTC",
        "Start Date": "Start Date",
        "Additional Information": "Additional Information",
        "Post A Internship": "Post A Internship",
        "Stipend": "Stipend",
        "Post Internship": "Post Internship",
        "Duration": "Duration",
        "About": "About",
        "instagram page": "instagram page",
        "About Job": "About Job",
        "Learn Business Communication": "Learn Business Communication",
        "Apply": "Apply",
        "Apply on for Company": "Apply on for Company",
        "Your resume": "Your resume",
        "Your current resume will be submitted along with the application": "Your current resume will be submitted along with the application",
        "why should we hire for this role?": "why should we hire for this role?",
        "Your availiblity": "Your availiblity",
        "Confirm your availiblity": "Confirm your availiblity",
        "Yes, I am available to join immediately": "Yes, I am available to join immediately",
        "No, I am currently on notice period": "No, I am currently on notice period",
        "No, I will have to serve notice period": "No, I will have to serve notice period",
        "Other": "Other",
        "Please specify your availability": "Please specify your availability",
        "Custom resume": "Custom resume",
        "Optional": "Optional",
        "Employer can download and view this resume": "Employer can download and view this resume",
        "Submit application": "Submit application",
        "Experience": "Experience",
        "Salary": "Salary",
        "Enter your OTP": "Enter your OTP",
        "Verify OTP": "Verify OTP",
        "Desired minimum monthly stipend": "Desired minimum monthly stipend",
        "Clear all": "Clear all",
        "Keyword Search": "Keyword Search",
        "View In Deatils": "View In Deatils",
        "Login History": "Login History",
        "IP Address": "IP Address",
        "Browser": "Browser",
        "Operating System": "Operating System",
        "Device Type": "Device Type",
        "Login Time": "Login Time",
        "UID": "UID"
    };
};

// Function to translate text using Google Translate API
const translateText = async (text, targetLanguage) => {
    let translateFrom = 'en';
    let translateTo = targetLanguage;
    console.log(text)
    console.log(targetLanguage)
    const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${translateFrom}&tl=${translateTo}&dt=t&q=${encodeURI(
        text
    )}`;
    // let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    const res = await fetch(apiUrl)
    const resData = await res.json();

    // return resData.responseData.translatedText;
    return resData[0][0][0];
};

// Convert data into respective languages
const convertData = async (data, languages) => {
    const translations = {};

    for (const [key, value] of Object.entries(data)) {
        translations[key] = {};

        for (const lang of languages) {
            translations[key][lang] = await translateText(value, lang);
        }
    }
    console.log(translations)

    return translations;
};

// Save translated data to JSON files
const saveTranslations = async (translations, languages) => {
    for (const lang of languages) {
        const langTranslations = Object.fromEntries(
            Object.entries(translations).map(([key, value]) => [key, value[lang]])
        );

        await axios.post('http://localhost:3001/save-translations', {
            lang,
            translations: langTranslations
        });
        console.log(`Translation file for ${lang} has been saved.`);
    }
};

// Main function to fetch, translate and save data
export const translate = async () => {
    const data = await fetchDataFromDatabase();
    const languages = ['en', 'es', 'hi', 'pt', 'zh', 'fr'];
    const translations = await convertData(data, languages);
    await saveTranslations(translations, languages);
};

translate().catch(console.error);
