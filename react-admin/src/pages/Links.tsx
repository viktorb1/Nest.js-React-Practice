import React, { useEffect, useState } from 'react'
import Layout from "../components/Layout";
import axios from "axios"
import { Table, TableCell, TableHead, TableRow, TableBody, TableFooter, TablePagination, } from "@mui/material";
import { Link } from "../models/link";
import { useParams } from 'react-router-dom';

const Links = (props: any) => {
    const [links, setLinks] = useState<Link[]>([])
    const [page, setPage] = useState(0)
    const perPage: number = 10;
    const { id } = useParams();

    useEffect(() => {
        (async () => {
        // const {data} = await axios.get(`users/${props.match.params.id}/links`);
        const {data} = await axios.get(`users/${id}/links`);
        setLinks(data)
        console.log("alsdkjf")
        })();
    }, [])

    return (
        <div>
          <Layout>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Code</TableCell>
                        <TableCell>Count</TableCell>
                        <TableCell>Revenue</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {links.slice(page*perPage, (page+1)*perPage).map(link => {
                          return (
                            <TableRow key={link.id}>
                              <TableCell>{link.id}</TableCell>
                              <TableCell>{link.code}</TableCell>
                              <TableCell>{link.orders.length}</TableCell>
                              <TableCell>{link.orders.reduce((s, o) => s + o.total, 0)}</TableCell>
                            </TableRow>
                          )
                        })}
                    </TableBody>
                    <TableFooter>
                      <TablePagination 
                              count={links.length} 
                              onPageChange={(e, newPage) => setPage(newPage)} 
                              page={page} 
                              rowsPerPage={perPage} 
                              rowsPerPageOptions={[]}
                          />
                    </TableFooter>
    
                  </Table>
                  
          </Layout>
        </div>
      );
};

export default Links;