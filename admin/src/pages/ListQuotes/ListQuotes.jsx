import React, { useEffect, useState } from 'react';
import './ListQuotes.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { RefreshCw } from 'lucide-react';
import ListQuotePopup from '../../components/ListQuotePopup/ListQuotePopup';

function useQuotes(url) {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/quote/list`);
      if (response.data.success) {
        const quotes = response.data.data.map(quote => ({
          ...quote,
          formattedDate: new Date(quote.createdAt).toLocaleDateString()
        }));
        setList(quotes);
      } else {
        toast.error("Error fetching quotes");
      }
    } catch (error) {
      toast.error("An error occurred while fetching data");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return { list, fetchList };
}

const ListQuotes = ({ url }) => {
  const { list, fetchList } = useQuotes(url);
  const [selectedQuote, setSelectedQuote] = useState(null);

  const handleRemoveQuote = async (e, quoteID) => {
    e.stopPropagation();
    const response = await axios.post(`${url}/api/quote/remove`, { id: quoteID });
    if (response.data.success) {
      toast.success(response.data.message);
      fetchList();
      return true;
    } else {
      toast.error("Error removing quote");
      return false;
    }
  };

  return (
    <div className='list add flex-col'>
      <div className='list-title'>
        <p>All Quote Requests</p>
        <div className='list-title-right' onClick={fetchList}>
          <p>Refresh</p>
          <RefreshCw />
        </div>
      </div>
      <div className="list-table">
        <div className="list-quotes-table-format title">
          <b>Service</b>
          <b>Name</b>
          <b>Email</b>
          <b>Phone</b>
          <b>Date</b>
          <b>Actions</b>
        </div>
        {list.map((item, index) => {
          return (
            <div 
              key={index} 
              className='list-quotes-table-format clickable'
              onClick={() => setSelectedQuote(item)}
            >
              <p>{item.service}</p>
              <p>{item.name}</p>
              <p>{item.email}</p>
              <p>{item.phone}</p>
              <p>{item.formattedDate}</p>
              <div className="quote-actions">
                <p onClick={(e) => handleRemoveQuote(e, item._id)} className='cursor remove'>X</p>
              </div>
            </div>
          );
        })}
      </div>
      <ListQuotePopup 
        quote={selectedQuote} 
        onClose={() => setSelectedQuote(null)} 
      />
    </div>
  );
}

export default ListQuotes;