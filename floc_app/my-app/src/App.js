import Card from './components/card';

function App() {
  return (
    <div>
      <Card 
        image="https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/1-cool-monkey-with-sunglasses-and-headphones-mister-tee.jpg"
        name='Deepak'
        activity='Bike Ride'
        time='9AM'
        location='GG Park'
        description="Let's crush those hills!"
      />
      <Card 
        image="https://i.pinimg.com/736x/32/5c/fc/325cfc67933c173e35003b30546a88da.jpg"
        name='Ananya'
        activity='Tennis'
        time='4PM'
        location='Bay Club'
        description="If the weather's good!"
      />
    </div>
  );
}

export default App;
