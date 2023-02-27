import { useMemo } from "react";
import { Button, Text } from "@chakra-ui/react";
import { deleteProduct, fetchProductList } from "../../../api";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Table, Space, Popconfirm } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";

function Products() {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery(
    "admin:products",
    fetchProductList
  );

  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => queryClient.invalidateQueries("todos"),
    refetchQueries: ["admin:products"],
  });

  const columns = useMemo(() => {
    return [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (text) => <span>{moment(text).format("DD/MM/YYYY")}</span>,
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <Link to={`/admin/products/${record._id}`}>Edit</Link>
            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={() => {
                deleteMutation.mutate(record._id, {
                  onSuccess: () => {
                    console.log("success");
                    queryClient.invalidateQueries("admin:products");
                  },
                });
              }}
              onCancel={() => console.log("cancel")}
              okText="Yes"
              cancelText="No"
              placement="left"
            >
              <a href="/#">Delete</a>
            </Popconfirm>
          </Space>
        ),
      },
    ];
  }, []);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <Text fontSize="2xl" p={5}>
        Products
      </Text>
      <Link to={"/admin/products/new"}>
        <Button>New Product</Button>
      </Link>
      <br />
      <Table dataSource={data} columns={columns} rowKey="_id" />
    </div>
  );
}

export default Products;
