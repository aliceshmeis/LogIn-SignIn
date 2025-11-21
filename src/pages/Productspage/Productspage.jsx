import React, { useState, useEffect } from 'react';
import RouteWrapper from '../../components/RouteWrapper/RouteWrapper';
import { getAllInventory } from '../../apis/inventoryApi';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Box,
  Chip,
  IconButton,
  Collapse,
  Alert,
  CircularProgress,
  Container
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LaptopIcon from '@mui/icons-material/Laptop';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import styles from './ProductsPage.module.scss';

// Styled component for expand button
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});// track which product card is expanding
  const [selectedCategory, setSelectedCategory] = useState('laptops');//current tab category

  useEffect(() => {//fetch products on pagelaod/only once
    fetchProducts();
  }, []);

  const fetchProducts = async () => {//stores products in
    try {
      setLoading(true);
      const response = await getAllInventory();
      setProducts(response.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExpandClick = (productId) => {
    setExpandedCards((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleAddToCart = (product) => {
    if (product.isSample) {
      alert('This is a sample product. Coming soon!');
      return;
    }
    console.log('Adding to cart:', product);
    alert(`Added ${product.itemName} to cart!`);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setExpandedCards({});//Resets expandedCards 
  };

  // Sample products for demonstration
  const sampleLaptops = [
    { id: 'sample-l1', itemName: 'MacBook Pro 16"', itemCode: 'MBP16', description: 'Professional laptop with M3 Pro chip, 16GB RAM', category: 'tech', unitPrice: 2499, quantityAvailable: 0, warehouseLocation: 'Coming Soon', createdDate: new Date().toISOString(), isSample: true },
    { id: 'sample-l2', itemName: 'Dell XPS 15', itemCode: 'DXPS15', description: 'Premium Windows laptop with Intel i7', category: 'tech', unitPrice: 1899, quantityAvailable: 0, warehouseLocation: 'Coming Soon', createdDate: new Date().toISOString(), isSample: true },
    { id: 'sample-l3', itemName: 'HP Spectre x360', itemCode: 'HPSX360', description: 'Convertible 2-in-1 laptop', category: 'tech', unitPrice: 1599, quantityAvailable: 0, warehouseLocation: 'Coming Soon', createdDate: new Date().toISOString(), isSample: true },
    { id: 'sample-l4', itemName: 'Lenovo ThinkPad X1', itemCode: 'LTX1', description: 'Business laptop with durability', category: 'tech', unitPrice: 1799, quantityAvailable: 0, warehouseLocation: 'Coming Soon', createdDate: new Date().toISOString(), isSample: true },
  ];

  const samplePhones = [
    { id: 'sample-p1', itemName: 'iPhone 15 Pro Max', itemCode: 'IP15PM', description: 'Latest iPhone with A17 Pro chip, titanium design', category: 'tech', unitPrice: 1199, quantityAvailable: 0, warehouseLocation: 'Coming Soon', createdDate: new Date().toISOString(), isSample: true },
    { id: 'sample-p2', itemName: 'Samsung Galaxy S24 Ultra', itemCode: 'SGS24U', description: 'Flagship Android with S Pen', category: 'tech', unitPrice: 1099, quantityAvailable: 0, warehouseLocation: 'Coming Soon', createdDate: new Date().toISOString(), isSample: true },
    { id: 'sample-p3', itemName: 'Google Pixel 8 Pro', itemCode: 'GP8P', description: 'Best camera phone with AI features', category: 'tech', unitPrice: 899, quantityAvailable: 0, warehouseLocation: 'Coming Soon', createdDate: new Date().toISOString(), isSample: true },
    { id: 'sample-p4', itemName: 'OnePlus 12', itemCode: 'OP12', description: 'Fast charging flagship phone', category: 'tech', unitPrice: 799, quantityAvailable: 0, warehouseLocation: 'Coming Soon', createdDate: new Date().toISOString(), isSample: true },
  ];

  const sampleAccessories = [
    { id: 'sample-a1', itemName: 'AirPods Pro 2', itemCode: 'APP2', description: 'Premium wireless earbuds with ANC', category: 'tech', unitPrice: 249, quantityAvailable: 0, warehouseLocation: 'Coming Soon', createdDate: new Date().toISOString(), isSample: true },
    { id: 'sample-a2', itemName: 'Magic Keyboard', itemCode: 'MKB', description: 'Wireless keyboard for Mac', category: 'tech', unitPrice: 149, quantityAvailable: 0, warehouseLocation: 'Coming Soon', createdDate: new Date().toISOString(), isSample: true },
    { id: 'sample-a3', itemName: 'Logitech MX Master 3S', itemCode: 'LMXM3S', description: 'Ergonomic wireless mouse', category: 'tech', unitPrice: 99, quantityAvailable: 0, warehouseLocation: 'Coming Soon', createdDate: new Date().toISOString(), isSample: true },
    { id: 'sample-a4', itemName: 'USB-C Hub Pro', itemCode: 'USBCHP', description: '7-in-1 multi-port adapter', category: 'tech', unitPrice: 79, quantityAvailable: 0, warehouseLocation: 'Coming Soon', createdDate: new Date().toISOString(), isSample: true },
  ];

  // Categorize products
  const categorizeProducts = () => {
    const laptops = [];
    const phones = [];
    const accessories = [];

    products.forEach((product) => {
      const name = product.itemName.toLowerCase();
      if (name.includes('laptop')) {
        laptops.push(product);
      } else if (name.includes('iphone') || name.includes('phone') || name.includes('nokia')) {
        phones.push(product);
      } else {
        accessories.push(product);
      }
    });

    // Add sample products to fill out the display
    laptops.push(...sampleLaptops);
    phones.push(...samplePhones);
    accessories.push(...sampleAccessories);

    return { laptops, phones, accessories };
  };

  const { laptops, phones, accessories } = categorizeProducts();

  const getCurrentProducts = () => {
    switch (selectedCategory) {
      case 'laptops':
        return laptops;
      case 'phones':
        return phones;
      case 'accessories':
        return accessories;
      default:
        return [];
    }
  };

  const currentProducts = getCurrentProducts();

  // Product images
  const getProductImage = (product) => {
    const name = product.itemName.toLowerCase();
    if (name.includes('laptop') || name.includes('macbook') || name.includes('dell') || name.includes('hp') || name.includes('lenovo') || name.includes('thinkpad')) {
      return 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=400&fit=crop';
    } else if (name.includes('iphone') || name.includes('phone') || name.includes('nokia') || name.includes('samsung') || name.includes('pixel') || name.includes('oneplus')) {
      return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=400&fit=crop';
    } else {
      return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop';
    }
  };

  const renderProductCard = (product) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
      <Card
        className={styles.productCard}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff',
          color: '#0f172a',
          transition: 'all 0.3s ease',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          opacity: product.isSample ? 0.85 : 1,
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 20px 25px rgba(30, 64, 175, 0.15)',
            borderColor: '#3b82f6',
          },
        }}
      >
        <CardMedia
          component="img"
          height="220"
          image={getProductImage(product)}
          alt={product.itemName}
          sx={{
            objectFit: 'cover',
          }}
        />
        <CardContent sx={{ flexGrow: 1, pb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 600, color: '#1e40af', fontSize: '1.1rem' }}>
              {product.itemName}
            </Typography>
            <Chip
              label={product.isSample ? 'Coming Soon' : product.category}
              size="small"
              sx={{
                backgroundColor: product.isSample ? '#fef3c7' : '#dbeafe',
                color: product.isSample ? '#92400e' : '#1e40af',
                fontWeight: 600,
                fontSize: '0.7rem',
              }}
            />
          </Box>

          <Typography variant="h5" sx={{ color: '#10b981', fontWeight: 700, mb: 1 }}>
            ${product.unitPrice.toLocaleString()}
          </Typography>

          <Typography variant="body2" sx={{ color: '#64748b', mb: 1, fontSize: '0.85rem' }}>
            Code: {product.itemCode}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <InventoryIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
            <Typography variant="body2" sx={{ color: '#475569', fontSize: '0.85rem' }}>
              {product.isSample ? 'Coming Soon' : `Stock: ${product.quantityAvailable} units`}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOnIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
            <Typography variant="body2" sx={{ color: '#475569', fontSize: '0.85rem' }}>
              {product.warehouseLocation}
            </Typography>
          </Box>
        </CardContent>

        <CardActions disableSpacing sx={{ px: 2, pb: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddShoppingCartIcon />}
            onClick={() => handleAddToCart(product)}
            disabled={product.quantityAvailable === 0}
            sx={{
              backgroundColor: product.isSample ? '#cbd5e1' : '#1e40af',
              color: '#ffffff',
              fontWeight: 600,
              textTransform: 'none',
              flex: 1,
              fontSize: '0.85rem',
              '&:hover': {
                backgroundColor: product.isSample ? '#cbd5e1' : '#1e3a8a',
              },
              '&:disabled': {
                backgroundColor: '#e2e8f0',
                color: '#94a3b8',
              },
            }}
          >
            {product.isSample ? 'Coming Soon' : (product.quantityAvailable === 0 ? 'Out of Stock' : 'Add to Order')}
          </Button>

          <ExpandMore
            expand={expandedCards[product.id]}
            onClick={() => handleExpandClick(product.id)}
            aria-expanded={expandedCards[product.id]}
            aria-label="show more"
            sx={{ color: '#64748b' }}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>

        <Collapse in={expandedCards[product.id]} timeout="auto" unmountOnExit>
          <CardContent sx={{ pt: 0, borderTop: '1px solid #e2e8f0' }}>
            <Typography variant="body2" sx={{ color: '#475569', mb: 1, fontSize: '0.9rem' }}>
              <strong style={{ color: '#1e40af' }}>Description:</strong> {product.description}
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>
              {product.isSample ? 'Sample Product' : `Added: ${new Date(product.createdDate).toLocaleDateString()}`}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );

  if (loading) {
    return (
      <RouteWrapper>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
          }}
        >
          <CircularProgress sx={{ color: '#3b82f6' }} size={60} />
        </Box>
      </RouteWrapper>
    );
  }

  return (
    <RouteWrapper>
      <div className={styles.productsPage}>
        {/* Header Section */}
        <Box sx={{ 
          backgroundColor: '#ffffff', 
          py: 4,
          borderBottom: '1px solid #e2e8f0'
        }}>
          <Container maxWidth="xl">
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: '#0f172a',
                mb: 0.5,
              }}
            >
              Our Products
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748b', fontSize: '1rem' }}>
              Browse our collection of high-quality tech products
            </Typography>
          </Container>
        </Box>

        {/* Category Tabs */}
        <Box sx={{ 
          backgroundColor: '#ffffff',
          borderBottom: '2px solid #e2e8f0'
        }}>
          <Container maxWidth="xl">
            <Box sx={{ display: 'flex', gap: 0, pt: 2 }}>
              <Button
                onClick={() => handleCategoryChange('laptops')}
                startIcon={<LaptopIcon />}
                sx={{
                  backgroundColor: 'transparent',
                  color: selectedCategory === 'laptops' ? '#1e40af' : '#64748b',
                  fontWeight: 600,
                  textTransform: 'none',
                  px: 3,
                  py: 1.5,
                  fontSize: '1rem',
                  borderRadius: 0,
                  borderBottom: selectedCategory === 'laptops' ? '3px solid #1e40af' : '3px solid transparent',
                  '&:hover': {
                    backgroundColor: '#f8fafc',
                    color: '#1e40af',
                  },
                  minWidth: '150px',
                }}
              >
                Laptops ({laptops.length})
              </Button>
              <Button
                onClick={() => handleCategoryChange('phones')}
                startIcon={<PhoneAndroidIcon />}
                sx={{
                  backgroundColor: 'transparent',
                  color: selectedCategory === 'phones' ? '#1e40af' : '#64748b',
                  fontWeight: 600,
                  textTransform: 'none',
                  px: 3,
                  py: 1.5,
                  fontSize: '1rem',
                  borderRadius: 0,
                  borderBottom: selectedCategory === 'phones' ? '3px solid #1e40af' : '3px solid transparent',
                  '&:hover': {
                    backgroundColor: '#f8fafc',
                    color: '#1e40af',
                  },
                  minWidth: '150px',
                }}
              >
                Phones ({phones.length})
              </Button>
              <Button
                onClick={() => handleCategoryChange('accessories')}
                startIcon={<HeadphonesIcon />}
                sx={{
                  backgroundColor: 'transparent',
                  color: selectedCategory === 'accessories' ? '#1e40af' : '#64748b',
                  fontWeight: 600,
                  textTransform: 'none',
                  px: 3,
                  py: 1.5,
                  fontSize: '1rem',
                  borderRadius: 0,
                  borderBottom: selectedCategory === 'accessories' ? '3px solid #1e40af' : '3px solid transparent',
                  '&:hover': {
                    backgroundColor: '#f8fafc',
                    color: '#1e40af',
                  },
                  minWidth: '170px',
                }}
              >
                Accessories ({accessories.length})
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Products Section */}
        <Box sx={{ backgroundColor: '#f8fafc', minHeight: '70vh', py: 4 }}>
          <Container maxWidth="xl">
            {error && (
              <Alert severity="error" sx={{ mb: 4 }}>
                {error}
              </Alert>
            )}

            {/* Products Grid */}
            {currentProducts.length === 0 ? (
              <Alert severity="info">
                No products available in this category.
              </Alert>
            ) : (
              <Grid container spacing={4}>
                {currentProducts.map(renderProductCard)}
              </Grid>
            )}
          </Container>
        </Box>
      </div>
    </RouteWrapper>
  );
};

export default ProductsPage;