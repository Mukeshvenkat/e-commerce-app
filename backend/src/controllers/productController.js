const contentful = require('contentful');

const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const productController = {
    getProducts: async (req, res) => {
        const { name, category } = req.query;
        let filters = {
            content_type: 'product',
        };

        if (name) {
            filters['fields.name[match]'] = name;
        }
        if (category) {
            filters['fields.category'] = category;
        }

        try {
            const entries = await client.getEntries(filters);
            const products = entries.items.map(item => ({
                id: item.sys.id,
                name: item.fields.name,
                category: item.fields.category,
                price: item.fields.price,
                description: item.fields.description,
            }));
            res.status(200).json(products);
        } catch (error) {
            res.status(400).json({ error: 'Failed to fetch products from Contentful' });
        }
    },

    getProductById: async (req, res) => {
        const { id } = req.params;
        try {
            const entry = await client.getEntry(id);
            if (entry && entry.fields) {
                const product = {
                    id: entry.sys.id,
                    name: entry.fields.name,
                    category: entry.fields.category,
                    price: entry.fields.price,
                    description: entry.fields.description,
                };
                res.status(200).json(product);
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        } catch (error) {
            res.status(400).json({ error: 'Failed to fetch product from Contentful' });
        }
    },
};

module.exports = productController;