import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../Redux/alertSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { setUser } from "../Redux/userSlice";

function Notifications() {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const markAllAsSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:3000/api/user/mark-all-as-seen",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      dispatch(hideLoading());
    }
  };

  const deleteAll = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:3000/api/user/delete-all-notifications",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      dispatch(hideLoading());
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl">Notifications</h1>
      <Tabs>
        <Tabs.TabPane tab="Unseen" key={0}>
          <div onClick={() => markAllAsSeen()} className="flex justify-end">
            <h1 className="text-decoration-underline cursor-pointer">
              Mark all as read
            </h1>
          </div>
          <div>
            {user?.unseenNotifications.map((notification) => {
              return (
                <>
                  <div
                    onClick={() => navigate(notification.onclickPath)}
                    className=" bg-slate-300 shadow-md p-2 rounded-lg mt-3 cursor-pointer"
                  >
                    {notification.message}
                  </div>
                </>
              );
            })}
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Seen" key={1}>
          <div className="flex justify-end" onClick={() => deleteAll()}>
            <h1 className="text-decoration-underline cursor-pointer">
              Delete all
            </h1>
          </div>
          <div>
            {user?.seenNotifications.map((notification) => {
              return (
                <>
                  <div
                    onClick={() => navigate(notification.onclickPath)}
                    className=" bg-slate-300 shadow-md p-2 rounded-lg mt-3 cursor-pointer"
                  >
                    {notification.message}
                  </div>
                </>
              );
            })}
          </div>
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}

export default Notifications;
