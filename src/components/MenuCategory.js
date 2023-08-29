import Shimmer from "./Shimmer";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CDN_URL } from "../utils/constants.js";

const MenuCategory = (data) => {
  console.log(data);
  return (
    <div>
      <div>
        <Accordion defaultExpanded style={{ boxShadow: "none" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="styles_headerNestedTitle__1PFSM">
              {data.data.title} ({data.data.itemCards.length})
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <div>
                {data.data.itemCards.map((item) => (
                  <div key={item.card.info.id}>
                    <div className="singleItem">
                      <div>
                        {item.card.info.name} <br></br>
                        {" Rs."}
                        {item.card.info.price / 100 ||
                          item.card.info.defaultPrice / 100}
                      </div>
                      <div>
                        <img
                          className="styles_itemImage__3CsDL"
                          //   alt={item.card.info.name}
                          src={
                            CDN_URL + item.card.info.imageId ||
                            CDN_URL + item.card.info.id
                          }
                        ></img>
                        {/* <button>Add +</button> */}
                      </div>
                    </div>
                    <div className="styles_divider__2JelH"></div>
                  </div>
                ))}
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="main_border__1Cc4a"></div>
    </div>
  );
};

export default MenuCategory;
