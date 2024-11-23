import { users } from "@/mock/users";
import styles from "./SpaceMemberList.module.css";

export default function SpaceMemberList(){
    return(
        <div className={styles.container}>
            <div>
                <span className={styles.heading}>스페이스 참여자 목록</span>
                <img src="/invitation.png" alt="멤버초대" />
            </div>
            <ul className={styles.participantList}>
                {users.map((user) => (
                <li key={user.id} className={styles.participantItem}>
                    {/* 프로필 이미지 */}
                    <img
                    src={user.profileImage || "/user.png"}
                    alt={`${user.nickName} 프로필`}
                    className={styles.profileImage}
                    />
                    {/* 사용자 정보 */}
                    <div className={styles.userInfo}>
                    <p className={styles.userName}>{user.nickName}</p>
                    <p className={styles.userId}>{user.id}</p>
                    </div>
                </li>
                ))}
            </ul>
        </div>
    );
};