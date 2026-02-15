

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {

    // Helper to get icon for category
    const getCategoryIcon = (category) => {
        switch (category) {
            case 'dance': return '💃';
            case 'music': return '🎵';
            case 'drama': return '🎭';
            default: return '🎪';
        }
    };

    const categories = ['all', 'dance', 'music', 'drama'];

    return (
        <section className="filters">
            <div className="container">
                <div className="filter-buttons">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={selectedCategory === category ? 'filter-btn active' : 'filter-btn'}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category !== 'all' && getCategoryIcon(category)}
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryFilter;
