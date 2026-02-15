

const HeroSection = ({ searchQuery, setSearchQuery }) => {
    return (
        <section className="hero">
            <div className="hero-background"></div>
            <div className="hero-content">
                <h2 className="hero-title">Experience Culture</h2>
                <p className="hero-subtitle">Book tickets for dance, music & drama events</p>

                {/* Search Bar */}
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
