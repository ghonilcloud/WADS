const tickets = [
    {
      id: 1,
      name: 'John Doe',
      date: 'April 3, 2025',
      subject: 'Order not received on time',
      category: 'Late Delivery',
      categoryClass: 'late',
      description: "It has been 3 weeks since I made the order, but the item hasn't arrived yet.",
      handler: 'Not Assigned',
      priority: 'Not Assigned',
      priorityClass: 'not-assigned',
      status: 'new'
    },
    {
      id: 2,
      name: 'Almira',
      date: 'Jan 20, 2025',
      subject: 'Wrong color delivered',
      category: 'Product Issues',
      categoryClass: 'product-issues',
      description: 'I ordered a shirt in the color white, but I received black.',
      handler: 'Orlando Padiman',
      priority: 'High',
      priorityClass: 'high',
      status: 'open'
    },
    {
      id: 3,
      name: 'Oneal',
      date: 'Sept 7, 2024',
      subject: 'Cancel an order',
      category: 'Order and Shipping',
      categoryClass: 'shipping',
      description: 'I want to cancel because I made a mistake in choosing the size.',
      handler: 'Ariel Prandi',
      priority: 'Low',
      priorityClass: 'low',
      status: 'resolved'
    }
  ];
  
  export default tickets;
  