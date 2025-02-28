import Header from '../components/Header';
import Footer from '../components/Footer';
import "../assets/YourRecipe.css";
import avt from "../assets/avt.png";
import salad from "../assets/SaladTomato.jpg";
import pasta from "../assets/pasta.jpg";
import salad2 from "../assets/salad.jpg";
import cake from "../assets/cake.jpg";
import salad3 from "../assets/saladshrimp.jpg";
import salad4 from "../assets/bean.jpg";
import eggs from "../assets/egg.jpg";
import salad5 from "../assets/salad2.jpg";  
const YourRecipe = () => {
    return (
        <div className="recipe-container">
            <Header />
            
            <div className="user-info">
                <img src={avt} alt="Logo" className="avatar" />
                <div className="user-details">
                    <h1>Emma Gonzalez's Recipe Box</h1>
                    <p>
                        Emma Gonzalez is a deputy editor at Cheffify, bringing her expertise as a former cooking editor 
                        at The Los Angeles Times. She is also an accomplished author, contributing to numerous cookbooks 
                        and food publications. Originally from East Los Angeles, Emma now resides in New York City, 
                        where she explores a wide range of culinary delights.
                    </p>
                    <div className="subscribe-share">
                        <span>6.5k Subscribers</span>
                        <button className="share-btn">Share</button>
                    </div>
                </div>
            </div>

            {/* Thanh điều hướng */}
            <div className="nav-tabs">
                <span className="active">Saved Recipes</span>
                <span>Folders</span>
                <span>Recipes by Genevieve</span>
            </div>

            {/* Danh sách công thức nấu ăn */}
            <div className="recipe-grid">
                {recipes.map((recipe, index) => (
                    <div key={index} className="recipe-card">
                        <img className="recipe-image" src={recipe.image} alt={recipe.name} />
                        <h3>{recipe.name}</h3>
                        <p>{recipe.time} minutes</p>
                    </div>
                ))}
            </div>

            {/* Phân trang */}
            <div className="pagination">
                <button className="active">1</button>
                <button>2</button>
                <button>3</button>
                <button>...</button>
                <button>10</button>
                <button>11</button>
            </div>

            <Footer />
        </div>
    );
};

// Dữ liệu mẫu
const recipes = [
    { name: "Italian-style tomato salad", image: salad, time: 14 },
    { name: "Vegetable and shrimp spaghetti", image: pasta, time: 15 },
    { name: "Lotus delight salad", image: salad2, time: 20 },
    { name: "Snack cakes", image: cake, time: 21 },
    { name: "Salad with cabbage and shrimp", image: salad3, time: 32 },
    { name: "Bean, shrimp, and potato salad", image: salad4, time: 32 },
    { name: "Sunny-side up fried eggs", image: eggs, time: 32 },
    { name: "Lotus delight salad", image: salad5, time: 32 },
];

export default YourRecipe;
